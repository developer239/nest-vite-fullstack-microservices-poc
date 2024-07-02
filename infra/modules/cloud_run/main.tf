//
// Variables

// Global
variable "project_id" {
  description = "The GCP project ID"
}

variable "region" {
  description = "The GCP region for resources"
}

variable "environment" {
  description = "Deployment environment"
}

// Services
variable "repository_id" {
  description = "Repository ID for the Docker image in Artifact Registry"
}

variable "sql_connection_name" {
  description = "Connection name for the Cloud SQL instance"
}

variable "app_service_docker_image_name" {
  description = "The name of the Docker image for the app service"
}

// App
variable "app_api_prefix" {
  description = "The API prefix"
}

variable "app_api_name" {
  description = "The app name"
}

variable "app_api_auth_jwt_token_expires_in" {
  description = "The JWT token expiration"
}

// Database
variable "database_name" {
  description = "The database name"
}

variable "db_user_secret"  {
  description = "The secret name for the database user"
}

variable "db_password_secret" {
  description = "The secret name for the database password"
}

//
// Main

resource "google_cloud_run_service" "app_service" {
  name     = "${var.project_id}-${var.environment}-service"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}/${var.environment}-${var.app_service_docker_image_name}:latest"

        env {
          name  = "API_PREFIX"
          value = var.app_api_prefix
        }
        env {
          name  = "APP_NAME"
          value = var.app_api_name
        }
        env {
          name  = "AUTH_JWT_TOKEN_EXPIRES_IN"
          value = var.app_api_auth_jwt_token_expires_in
        }
        env {
          name = "AUTH_JWT_SECRET"
          value_from {
            secret_key_ref {
              name = "${var.environment}-auth-jwt-secret"
              key  = "latest"
            }
          }
        }
        env {
          name  = "DATABASE_HOST"
          value = "/cloudsql/${var.sql_connection_name}"
        }
        env {
          name = "DATABASE_USER"
          value_from {
            secret_key_ref {
              name = var.db_user_secret
              key  = "latest"
            }
          }
        }
        env {
          name = "DATABASE_PASSWORD"
          value_from {
            secret_key_ref {
              name = var.db_password_secret
              key  = "latest"
            }
          }
        }
        env {
          name = "DATABASE_NAME"
          value = var.database_name
        }
        env {
          name = "NODE_ENV"
          value = var.environment
        }
      }
    }

    metadata {
      annotations = {
        "run.googleapis.com/cloudsql-instances" = var.sql_connection_name
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_compute_region_network_endpoint_group" "cloudrun_neg" {
  name                  = "${var.project_id}-${var.environment}-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region

  cloud_run {
    service = google_cloud_run_service.app_service.name
  }
}

// IAM

data "google_compute_default_service_account" "default" {
  project = var.project_id
}

resource "google_project_iam_member" "secret_manager_access" {
  project = var.project_id

  role    = "roles/secretmanager.secretAccessor"
  member = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

# Note: If you have working load balancer then you can remove this. I am keeping it here for debugging purposes.
resource "google_cloud_run_service_iam_policy" "app_service_iam" {
  location   = google_cloud_run_service.app_service.location
  project    = var.project_id
  service    = google_cloud_run_service.app_service.name

  policy_data = jsonencode({
    "bindings": [
      {
        "role": "roles/run.invoker",
        "members": [
          "allUsers"
        ]
      }
    ]
  })
}


// Output

output "cloudrun_neg_id" {
  value = google_compute_region_network_endpoint_group.cloudrun_neg.id
}

output "cloud_run_service_url" {
  value = google_cloud_run_service.app_service.status[0].url
}
