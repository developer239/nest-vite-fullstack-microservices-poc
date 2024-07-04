// Variables

// modules/secrets/variables.tf
variable "project_id" {
  type = string
}

variable "environment" {
  type = string
}

variable "secrets" {
  type        = map(string)
  description = "Map of secret names and their generated values"
}

variable "regenerate_secrets" {
  type    = map(bool)
  default = {}
}

// Main
resource "random_password" "secret_values" {
  for_each = var.secrets
  length   = 16
  special  = true

  keepers = {
    regenerate = lookup(var.regenerate_secrets, each.key, false)
  }
}

resource "google_secret_manager_secret" "secrets" {
  for_each  = var.secrets
  secret_id = "${var.environment}-${each.key}"
  project   = var.project_id

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "secret_versions" {
  for_each    = var.secrets
  secret      = google_secret_manager_secret.secrets[each.key].id
  secret_data = random_password.secret_values[each.key].result
}

// Outputs
output "secret_ids" {
  value = { for k, v in google_secret_manager_secret.secrets : k => v.secret_id }
}
