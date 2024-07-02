// Variables

variable "project_id" {
  description = "The GCP project ID"
}

variable "region" {
  description = "The GCP region for resources"
}

variable "environment" {
  description = "Deployment environment"
}


// Main

resource "google_artifact_registry_repository" "docker_repository" {
  location      = var.region
  repository_id = "${var.project_id}-${var.environment}-repo"
  format        = "DOCKER"
}

// Output

output "repository_id" {
  value = google_artifact_registry_repository.docker_repository.repository_id
}
