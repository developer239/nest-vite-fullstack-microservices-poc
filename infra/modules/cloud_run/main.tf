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

variable "container_image" {
  description = "The container image to deploy"
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
    name = string
    key  = string
  }))
  default = []
}

// Main

resource "google_cloud_run_service" "service" {
  name     = "${var.project_id}-${var.environment}-${var.service_name}"
  location = var.region

  template {
    spec {
      containers {
        image = var.container_image

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
            name = env.value.name
            value_from {
              secret_key_ref {
                name = env.value.name
                key  = env.value.key
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

resource "google_cloud_run_service_iam_member" "run_invoker" {
  location = google_cloud_run_service.service.location
  project  = var.project_id
  service  = google_cloud_run_service.service.name
  role     = "roles/run.invoker"
  member   = "allUsers"
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
