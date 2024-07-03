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

variable "db_version" {
  description = "The version of PostgreSQL"
  type        = string
}

variable "db_tier" {
  description = "The tier of the database"
  type        = string
}

variable "databases" {
  description = "Map of database names and their configurations"
  type = map(object({
    name            = string
    user_secret_id  = string
    password_secret_id = string
  }))
}

variable "vpc_network" {
  description = "The VPC network to use for the database instance"
  type        = string
}

variable "authorized_networks" {
  description = "List of authorized networks with their names and IP ranges"
  type = list(object({
    name  = string
    value = string
  }))
}

// Main

resource "google_sql_database_instance" "postgres_instance" {
  name             = "${var.project_id}-${var.environment}-db-instance"
  database_version = var.db_version
  region           = var.region

  settings {
    tier = var.db_tier

    ip_configuration {
      ipv4_enabled    = true  // Enable public IP
      private_network = var.vpc_network

      dynamic "authorized_networks" {
        for_each = var.authorized_networks
        content {
          name  = authorized_networks.value.name
          value = authorized_networks.value.value
        }
      }
    }
  }

  deletion_protection = false
}

resource "google_sql_database" "databases" {
  for_each = var.databases
  name     = each.value.name
  instance = google_sql_database_instance.postgres_instance.name
}

data "google_secret_manager_secret_version" "db_usernames" {
  for_each = var.databases
  secret   = each.value.user_secret_id
}

data "google_secret_manager_secret_version" "db_passwords" {
  for_each = var.databases
  secret   = each.value.password_secret_id
}

resource "google_sql_user" "database_users" {
  for_each = var.databases
  instance = google_sql_database_instance.postgres_instance.name
  name     = data.google_secret_manager_secret_version.db_usernames.secret_data
  password = data.google_secret_manager_secret_version.db_passwords[each.key].secret_data
}

// IAM

data "google_compute_default_service_account" "default" {
  project = var.project_id
}

resource "google_project_iam_member" "cloudsql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

resource "google_project_iam_member" "secret_manager_access" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

// Output

output "db_public_ip" {
  value = google_sql_database_instance.postgres_instance.public_ip_address
}

output "connection_name" {
  value = google_sql_database_instance.postgres_instance.connection_name
}

output "db_user_secret" {
  value = data.google_secret_manager_secret_version.db_username.secret
}

output "db_password_secret" {
  value = data.google_secret_manager_secret_version.db_password.secret
}

output "database_names" {
  value = { for k, v in google_sql_database.databases : k => v.name }
}

output "instance_name" {
  value = google_sql_database_instance.postgres_instance.name
}

output "postgres_connection_strings" {
  # TODO: set to true when in CI
  sensitive = false
  value = {
    for k, v in google_sql_database.databases : k => format(
      "postgresql://%s:%s@%s:5432/%s",
      data.google_secret_manager_secret_version.db_username.secret_data,
      data.google_secret_manager_secret_version.db_password.secret_data,
      google_sql_database_instance.postgres_instance.public_ip_address,
      v.name
    )
  }
}
