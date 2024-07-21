// Variables

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "environment" {
  description = "The environment (e.g., dev, prod)"
  type        = string
  validation {
    condition = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be one of: dev, prod."
  }
}

variable "region" {
  description = "The region for Firebase resources"
  type        = string
}

// Main

resource "google_project_service" "firebase_api" {
  project = var.project_id
  service = "firebase.googleapis.com"

  disable_on_destroy = false
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project_id

  depends_on = [google_project_service.firebase_api]
}

resource "google_firebase_web_app" "env_specific" {
  provider     = google-beta
  project      = var.project_id
  display_name = "${var.project_id}-${var.environment}-web-app"

  depends_on = [google_firebase_project.default]
}

data "google_firebase_web_app_config" "env_specific" {
  provider   = google-beta
  web_app_id = google_firebase_web_app.env_specific.app_id
  project    = var.project_id
}

// Output

output "app_id" {
  description = "Firebase App ID"
  value       = google_firebase_web_app.env_specific.app_id
}

output "api_key" {
  description = "Firebase API Key"
  value       = data.google_firebase_web_app_config.env_specific.api_key
  sensitive   = true
}

output "auth_domain" {
  description = "Firebase Auth Domain"
  value       = data.google_firebase_web_app_config.env_specific.auth_domain
}

output "project_id" {
  description = "Firebase Project ID"
  value       = var.project_id
}

output "storage_bucket" {
  description = "Firebase Storage Bucket"
  value       = data.google_firebase_web_app_config.env_specific.storage_bucket
}

output "messaging_sender_id" {
  description = "Firebase Messaging Sender ID"
  value       = data.google_firebase_web_app_config.env_specific.messaging_sender_id
}
