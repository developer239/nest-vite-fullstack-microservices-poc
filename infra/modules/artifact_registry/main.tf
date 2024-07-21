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
    condition = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be one of: dev, prod."
  }
}

// Main

resource "google_artifact_registry_repository" "docker_repository" {
  project       = var.project_id
  location      = var.region
  repository_id = "${var.environment}-repo"
  description   = "Docker repository for ${var.environment} environment"
  format        = "DOCKER"

  docker_config {
    immutable_tags = true
  }
}

// Output

output "repository_id" {
  description = "The ID of the created Artifact Registry repository"
  value       = google_artifact_registry_repository.docker_repository.repository_id
}

output "repository_name" {
  description = "The name of the created Artifact Registry repository"
  value       = google_artifact_registry_repository.docker_repository.name
}
