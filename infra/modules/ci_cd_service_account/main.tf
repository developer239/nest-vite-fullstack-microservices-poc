// Variables

variable "project_id" {
  description = "The GCP project ID"
}

variable "environment" {
  description = "Deployment environment"
}

// Main

resource "google_service_account" "ci_cd" {
  account_id   = "${var.environment}-ci-cd-service-account"
  display_name = "${var.environment} Github action CI/CD service account"
  project      = var.project_id
}

// IAM

resource "google_project_iam_member" "editor" {
  project = var.project_id
  role    = "roles/editor"
  member  = "serviceAccount:${google_service_account.ci_cd.email}"
}

resource "google_project_iam_member" "secret_manager_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.ci_cd.email}"
}

resource "google_project_iam_member" "cloudsql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
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
  secret      = google_secret_manager_secret.ci_cd_key_secret.id
  secret_data = base64decode(google_service_account_key.ci_cd_key.private_key)
}

// Output

output "service_account_email" {
  value       = google_service_account.ci_cd.email
  description = "The email address of the service account"
}

output "ci_cd_key_secret_id" {
  value       = google_secret_manager_secret.ci_cd_key_secret.id
  description = "The ID of the secret containing the service account key"
}
