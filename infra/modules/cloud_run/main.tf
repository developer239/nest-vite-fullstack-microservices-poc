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
  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be one of: dev, prod."
  }
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
  default     = null
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

variable "use_sql" {
  description = "Whether the service uses Cloud SQL"
  type        = bool
  default     = false
}

variable "cloudsql_instance" {
  description = "The Cloud SQL instance connection name"
  type        = string
  default     = null
}

// Main
resource "google_cloud_run_service" "service" {
  name     = "${var.environment}-${var.service_name}"
  location = var.region
  project  = var.project_id

  template {
    spec {
      service_account_name = google_service_account.cloud_run_sa.email
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}/${var.environment}-${var.docker_image_name}:latest"

        dynamic "env" {
          for_each = var.env_vars
          content {
            name  = env.key
            value = env.value
          }
        }

        dynamic "env" {
          for_each = var.secrets
          content {
            name = env.value.variableName
            value_from {
              secret_key_ref {
                name = env.value.secretName
                key  = env.value.key
              }
            }
          }
        }
      }
    }

    metadata {
      annotations = merge(
          var.vpc_connector != null ? {
          "run.googleapis.com/vpc-access-connector" = var.vpc_connector
          "run.googleapis.com/vpc-access-egress"    = "all-traffic"
        } : {},
          var.cloudsql_instance != null ? {
          "run.googleapis.com/cloudsql-instances" = var.cloudsql_instance
        } : {}
      )
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_iam_member.cloud_run_sa_secret_manager_permissions]
}

resource "google_compute_region_network_endpoint_group" "cloudrun_neg" {
  name                  = "${var.environment}-${var.service_name}-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  project               = var.project_id

  cloud_run {
    service = google_cloud_run_service.service.name
  }
}

// IAM

resource "google_service_account" "cloud_run_sa" {
  account_id   = "${var.environment}-${var.service_name}-sa"
  display_name = "Service Account for ${var.service_name} Cloud Run Service"
  project      = var.project_id
}

resource "google_project_iam_member" "cloud_run_sa_secret_manager_permissions" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.cloud_run_sa.email}"
}

resource "google_project_iam_member" "cloud_run_sa_sql_client_permissions" {
  count   = var.use_sql ? 1 : 0
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.cloud_run_sa.email}"
}

resource "google_cloud_run_service_iam_policy" "app_service_iam" {
  location    = google_cloud_run_service.service.location
  project     = var.project_id
  service     = google_cloud_run_service.service.name
  policy_data = data.google_iam_policy.cloud_run_policy.policy_data
}

data "google_iam_policy" "cloud_run_policy" {
  binding {
    role = "roles/run.invoker"
    members = ["allUsers"]
  }

  binding {
    role = "roles/run.admin"
    members = ["serviceAccount:${google_service_account.cloud_run_sa.email}"]
  }
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
