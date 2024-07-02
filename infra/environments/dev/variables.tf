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

# Load Balancer

variable "domains" {
  description = "The domains for the load balancer"
  type        = list(string)
  default = ["your-domain.com"]
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


# App Service

variable "app_service_docker_image_name" {
  description = "The name of the Docker image for the app service"
  default     = "app-service"
}

variable "app_api_prefix" {
  description = "API prefix"
  default     = "api"
}

variable "app_api_name" {
  description = "Application name"
  default     = "BE API"
}

variable "app_api_auth_jwt_token_expires_in" {
  description = "JWT token expiration time"
  default     = "1d"
}
