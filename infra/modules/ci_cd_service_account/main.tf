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
