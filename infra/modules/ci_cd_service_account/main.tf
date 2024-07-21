// Variables

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  validation {
    condition = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be one of: dev, prod."
  }
}

// Main

resource "google_service_account" "ci_cd" {
  account_id   = "${var.environment}-ci-cd-service-account"
  display_name = "${var.environment} Github action CI/CD service account"
  project      = var.project_id
}

// IAM

resource "google_project_iam_member" "ci_cd_sa_permissions" {
  for_each = toset([
    "roles/editor",
    "roles/secretmanager.secretAccessor",
    "roles/cloudsql.client"
  ])

  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.ci_cd.email}"
}

// Service Account Key and Secret

resource "google_service_account_key" "ci_cd_key" {
  service_account_id = google_service_account.ci_cd.name
}

resource "google_secret_manager_secret" "ci_cd_key_secret" {
  secret_id = "${var.environment}-gcp-auth-sa-key"
  project   = var.project_id

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "ci_cd_key_secret_version" {
  secret = google_secret_manager_secret.ci_cd_key_secret.id
  secret_data = base64decode(google_service_account_key.ci_cd_key.private_key)
}

// Output

output "ci_cd_account_email" {
  value       = google_service_account.ci_cd.email
  description = "The email address of the service account"
}

output "ci_cd_key_secret_id" {
  value       = google_secret_manager_secret.ci_cd_key_secret.secret_id
  description = "The ID of the secret containing the service account key"
}

output "ci_cd_key_content" {
  value = base64decode(google_service_account_key.ci_cd_key.private_key)
  description = "The service account key content"
  sensitive   = true
}
