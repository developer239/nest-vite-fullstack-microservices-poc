// Variables

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
}

variable "repository_id" {
  description = "Repository ID for the Docker image in Artifact Registry"
  type        = string
}

variable "docker_image_name" {
  description = "The name of the Docker image for the service"
  type        = string
}

variable "vpc_connector" {
  description = "The VPC connector for the Cloud Run service"
  type        = string
}

variable "cloudsql_instance" {
  description = "The Cloud SQL instance connection name"
  type        = string
  default     = ""
}

variable "env_vars" {
  description = "Environment variables for the service"
  type        = map(string)
  default     = {}
}

variable "secrets" {
  description = "Secrets to mount in the service"
  type = list(object({
    secretName   = string
    variableName = string
    key          = string
  }))
  default = []
}

// Main

# Secret Name Workaround START
# Cloud Run has strict requirements for secret names, disallowing certain characters like hyphens.
# This section creates a mapping between the original secret names and Cloud Run-compatible names.

# Generate a unique suffix for each secret to avoid naming conflicts
resource "random_id" "secret_suffix" {
  for_each    = { for idx, secret in var.secrets : idx => secret }
  byte_length = 4
}

# Create a new secret in Secret Manager with a Cloud Run-compatible name
# This secret will act as a reference to the original secret
resource "google_secret_manager_secret" "service_secrets" {
  for_each  = { for idx, secret in var.secrets : idx => secret }
  secret_id = "${var.service_name}_${each.value.variableName}_${random_id.secret_suffix[each.key].hex}"
  project   = var.project_id

  replication {
    auto {}
  }
}

# Store the original secret name as the value in the new secret
# This allows us to maintain a reference to the original secret while using a compatible name
resource "google_secret_manager_secret_version" "service_secret_versions" {
  for_each    = { for idx, secret in var.secrets : idx => secret }
  secret      = google_secret_manager_secret.service_secrets[each.key].id
  secret_data = each.value.secretName
}
# Secret Name Workaround START

# Cloud Run Service Configuration
resource "google_cloud_run_service" "service" {
  name     = "${var.project_id}-${var.environment}-${var.service_name}"
  location = var.region
  project  = var.project_id

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}/${var.environment}-${var.docker_image_name}:latest"

        # Set up regular environment variables
        dynamic "env" {
          for_each = var.env_vars
          content {
            name  = env.key
            value = env.value
          }
        }

        # Set up secret environment variables
        # Use the Cloud Run-compatible secret names created earlier
        dynamic "env" {
          for_each = var.secrets
          content {
            name = env.value.variableName
            value_from {
              secret_key_ref {
                name = google_secret_manager_secret.service_secrets[env.key].secret_id
                key  = "latest"
              }
            }
          }
        }
      }
    }

    metadata {
      annotations = merge(
        {
          "run.googleapis.com/vpc-access-connector" = var.vpc_connector
        },
          var.cloudsql_instance != "" ? {
          "run.googleapis.com/cloudsql-instances" = var.cloudsql_instance
        } : {}
      )
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_compute_region_network_endpoint_group" "cloudrun_neg" {
  name                  = "${var.project_id}-${var.environment}-${var.service_name}-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region

  cloud_run {
    service = google_cloud_run_service.service.name
  }
}

// IAM

data "google_compute_default_service_account" "default" {
  project = var.project_id
}

resource "google_project_iam_member" "secret_manager_access" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

resource "google_cloud_run_service_iam_policy" "app_service_iam" {
  location = google_cloud_run_service.service.location
  project  = var.project_id
  service  = google_cloud_run_service.service.name

  policy_data = jsonencode({
    bindings = [
      {
        role    = "roles/run.invoker"
        members = ["allUsers"]
      }
    ]
  })
}

// Output

output "service_url" {
  value = google_cloud_run_service.service.status[0].url
}

output "service_name" {
  value = google_cloud_run_service.service.name
}

output "neg_id" {
  value = google_compute_region_network_endpoint_group.cloudrun_neg.id
}
