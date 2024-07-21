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
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be one of: dev, prod."
  }
}

variable "db_version" {
  description = "The version of PostgreSQL"
  type        = string
  default     = "POSTGRES_14"
}

variable "db_tier" {
  description = "The tier of the database"
  type        = string
  default     = "db-f1-micro"
}

variable "databases" {
  description = "Configuration for databases"
  type = map(object({
    name               = string
    user_secret_id     = string
    password_secret_id = string
  }))

  validation {
    condition     = length(var.databases) > 0
    error_message = "At least one database configuration must be provided."
  }
}

variable "vpc_network" {
  description = "The self_link of the VPC network to use for the database instance"
  type        = string
}

variable "vpc_connection" {
  description = "The VPC connection resource (for dependency only)"
  type        = any
}

variable "authorized_networks" {
  description = "List of authorized networks with their names and IP ranges"
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

// Main

resource "google_compute_global_address" "private_ip_address" {
  name          = "${var.environment}-db-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = var.vpc_network
}

resource "google_sql_database_instance" "postgres_instance" {
  name             = "${var.environment}-db-instance"
  database_version = var.db_version
  region           = var.region

  depends_on = [var.vpc_connection]

  settings {
    tier = var.db_tier

    ip_configuration {
      ipv4_enabled    = false
      private_network = var.vpc_network
      dynamic "authorized_networks" {
        for_each = var.authorized_networks
        content {
          name  = authorized_networks.value.name
          value = authorized_networks.value.value
        }
      }
    }

    user_labels = {
      environment = var.environment
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
  project  = var.project_id
}

data "google_secret_manager_secret_version" "db_passwords" {
  for_each = var.databases
  secret   = each.value.password_secret_id
  project  = var.project_id
}

resource "google_sql_user" "database_users" {
  for_each = var.databases
  instance = google_sql_database_instance.postgres_instance.name
  name     = data.google_secret_manager_secret_version.db_usernames[each.key].secret_data
  password = data.google_secret_manager_secret_version.db_passwords[each.key].secret_data
}

// IAM

data "google_compute_default_service_account" "default" {
  project = var.project_id
}

resource "google_project_iam_member" "default_sa_cloudsql_client_permissions" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

resource "google_project_iam_member" "default_sa_secret_manager_permissions" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

// Output

output "connection_name" {
  value = google_sql_database_instance.postgres_instance.connection_name
}

output "database_names" {
  value = { for k, v in google_sql_database.databases : k => v.name }
}

output "instance_name" {
  value = google_sql_database_instance.postgres_instance.name
}

output "private_ip_address" {
  value = google_sql_database_instance.postgres_instance.private_ip_address
}
