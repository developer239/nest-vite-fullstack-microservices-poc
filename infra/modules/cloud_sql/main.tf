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

variable "db_version" {
  description = "The version of PostgreSQL"
}

variable "db_tier" {
  description = "The tier of the database"
}

variable "database_name" {
  description = "The name of the database"
}

variable "authorized_networks" {
  description = "List of authorized networks with their names and IP ranges"
  type = list(object({
    name  = string
    value = string
  }))
}

// Main

data "google_secret_manager_secret_version" "db_username" {
  secret = "${var.environment}-db-username"
  version = "latest"
}

data "google_secret_manager_secret_version" "db_password" {
  secret = "${var.environment}-db-password"
  version = "latest"
}

resource "google_sql_database_instance" "postgres_instance" {
  name             = "${var.project_id}-${var.environment}-db-instance"
  database_version = var.db_version
  region           = var.region

  settings {
    tier = var.db_tier

    ip_configuration {
      dynamic "authorized_networks" {
        for_each = var.authorized_networks
        content {
          name  = authorized_networks.value.name
          value = authorized_networks.value.value
        }
      }

      ipv4_enabled = true
    }
  }

  deletion_protection = false
}

resource "google_sql_database_instance" "postgres_replica" {
  name             = "${var.project_id}-${var.environment}-db-replica"
  database_version = var.db_version
  region           = var.region
  instance_type = "READ_REPLICA_INSTANCE"
  master_instance_name = google_sql_database_instance.postgres_instance.name

  settings {
    tier = var.db_tier
  }

  deletion_protection = false
}

resource "google_sql_database" "default" {
  name     = var.database_name
  instance = google_sql_database_instance.postgres_instance.name
}

resource "google_sql_user" "postgres_user" {
  instance = google_sql_database_instance.postgres_instance.name
  name     = data.google_secret_manager_secret_version.db_username.secret_data
  password = data.google_secret_manager_secret_version.db_password.secret_data
}

// IAM

data "google_compute_default_service_account" "default" {
  project = var.project_id
}

resource "google_project_iam_member" "cloudsql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

resource "google_project_iam_member" "secret_manager_access" {
  project = var.project_id

  role    = "roles/secretmanager.secretAccessor"
  member = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

// Output

output "connection_name" {
  value = google_sql_database_instance.postgres_instance.connection_name
}

output "db_user_secret" {
  value = data.google_secret_manager_secret_version.db_username.secret
}

output "db_password_secret" {
  value = data.google_secret_manager_secret_version.db_password.secret
}

