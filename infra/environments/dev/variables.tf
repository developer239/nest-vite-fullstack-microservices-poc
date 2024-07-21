# Project

variable "project_id" {
  description = "The GCP project ID"
  type        = string

  validation {
    condition = can(regex("^[a-z][a-z0-9-]{4,28}[a-z0-9]$", var.project_id))
    error_message = "The project_id must not be empty."
  }
}

variable "region" {
  description = "The GCP region for resources"
  type        = string

  validation {
    condition = contains(["us-central1", "europe-central2"], var.region)
    error_message = "The region must be one of: 'us-central1', 'europe-central2'."
  }
}

variable "environment" {
  description = "Environment for the resources and services"
  type        = string

  validation {
    condition = contains(["dev", "prod"], var.environment)
    error_message = "The Environment must be one of: 'dev', 'prod'."
  }
}

# VPC

variable "vpc_subnet_cidr" {
  description = "CIDR range for the VPC subnet"
  type        = string

  validation {
    condition = can(cidrhost(var.vpc_subnet_cidr, 0))
    error_message = "Must be a valid CIDR range."
  }
}

variable "vpc_connector_cidr" {
  description = "CIDR range for the VPC connector"
  type        = string

  validation {
    condition = can(cidrhost(var.vpc_connector_cidr, 0))
    error_message = "Must be a valid CIDR range."
  }
}

# SQL

variable "db_version" {
  description = "The version of the database"
  type        = string

  validation {
    condition = contains(["POSTGRES_14"], var.db_version)
    error_message = "The db_version must be one of: 'POSTGRES_14'."
  }
}

variable "db_tier" {
  description = "The tier of the database"
  type        = string

  validation {
    condition = contains(["db-f1-micro", "db-g1-small", "db-n1-standard-1", "db-n1-standard-2"], var.db_tier)
    error_message = "The db_tier must be one of: 'db-f1-micro', 'db-g1-small', 'db-n1-standard-1', 'db-n1-standard-2'."
  }
}

variable "authorized_networks" {
  description = "List of authorized networks with their names and IP ranges"
  type = list(object({
    name  = string
    value = string
  }))
  default = []

  validation {
    condition = length(var.authorized_networks) <= 5 && alltrue([
      for net in var.authorized_networks : (length(net.name) > 0 && can(cidrhost(net.value, 0)))
    ])
    error_message = "Each authorized network must have a non-empty name and a valid CIDR IP range."
  }
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

# RabbitMQ

variable "rabbitmq_amqp_port" {
  description = "Port for RabbitMQ AMQP protocol"
  type        = number

  validation {
    condition     = var.rabbitmq_amqp_port > 0 && var.rabbitmq_amqp_port < 65536
    error_message = "The RabbitMQ AMQP port must be a positive number less than 65536."
  }
}

variable "rabbitmq_management_port" {
  description = "Port for RabbitMQ Management UI"
  type        = number

  validation {
    condition     = var.rabbitmq_management_port > 0 && var.rabbitmq_management_port < 65536
    error_message = "The RabbitMQ Management port must be a positive number less than 65536."
  }
}

variable "rabbitmq_docker_image_name" {
  description = "The name of the Docker image for RabbitMQ"
  type        = string
  default     = "rabbitmq"
}

variable "rabbitmq_docker_image_tag" {
  description = "The tag of the Docker image for RabbitMQ"
  type        = string
  default     = "latest"
}

# Cloud Run

variable "cloud_run_services" {
  description = "Configuration for Cloud Run services"
  type = map(object({
    service_name      = string
    docker_image_name = string
    use_sql = optional(bool, false)
    use_rabbitmq = optional(bool, false)
    use_gcp_auth = optional(bool, false) // Use GCP auth for service account (for example Firebase admin SDK)
    use_firebase = optional(bool, false) // Adds Firebase environment variables (for example web apps)
    env_vars = optional(map(string), {})
    secrets = optional(list(object({
      secretName   = string
      variableName = string
      key          = string
    })), [])
    min_instances = optional(number, 0)
    max_instances = optional(number, 10)
    depends_on = optional(list(string), [])
  }))
}
