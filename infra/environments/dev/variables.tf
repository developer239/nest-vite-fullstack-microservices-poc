# Project

variable "project_id" {
  description = "The GCP project ID"
}

variable "region" {
  description = "The GCP region for resources"
  default     = "us-central1"
}

variable "environment" {
  description = "Environment for the resources and services"
}

# DB Service

variable "db_version" {
  description = "The version of the database"
  default     = "POSTGRES_14"
}

variable "db_tier" {
  description = "The tier of the database"
  default     = "db-f1-micro"
}

variable "authorized_networks" {
  description = "List of authorized networks with their names and IP ranges"
  type = list(object({
    name  = string
    value = string
  }))
}
