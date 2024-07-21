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
  description = "The deployment environment (e.g., dev, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be one of: dev, prod."
  }
}

variable "vpc_network" {
  description = "The name of the VPC network"
  type        = string
}

variable "vpc_subnet" {
  description = "The name of the VPC subnet"
  type        = string
}

variable "vpc_subnet_cidr" {
  description = "The CIDR range of the VPC subnet"
  type        = string
}

variable "vpc_connector_cidr" {
  description = "The CIDR range of the VPC connector"
  type        = string
}

variable "machine_type" {
  description = "The machine type for the RabbitMQ instance"
  type        = string
  default     = "e2-micro"
}

variable "amqp_port" {
  description = "The AMQP port for RabbitMQ"
  type        = number
  default     = 5672
  validation {
    condition     = var.amqp_port > 0 && var.amqp_port < 65536
    error_message = "AMQP port must be between 1 and 65535."
  }
}

variable "management_port" {
  description = "The management port for RabbitMQ"
  type        = number
  default     = 15672
  validation {
    condition     = var.management_port > 0 && var.management_port < 65536
    error_message = "Management port must be between 1 and 65535."
  }
}

variable "docker_image_name" {
  description = "The name of the Docker image for RabbitMQ"
  type        = string
  default     = "rabbitmq"
}

variable "docker_image_tag" {
  description = "The tag of the Docker image for RabbitMQ"
  type        = string
  default     = "latest"
}

// Main

resource "google_compute_instance" "rabbitmq" {
  name         = "${var.environment}-rabbitmq"
  machine_type = var.machine_type
  zone         = "${var.region}-a"
  project      = var.project_id

  boot_disk {
    initialize_params {
      image = "cos-cloud/cos-stable"
    }
  }

  network_interface {
    network    = var.vpc_network
    subnetwork = var.vpc_subnet
    access_config {
      nat_ip = google_compute_address.external_ip.address
    }
  }

  metadata = {
    gce-container-declaration = yamlencode({
      spec = {
        containers = [
          {
            image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.project_id}-${var.environment}-repo/${var.environment}-${var.docker_image_name}:${var.docker_image_tag}"
            name  = "rabbitmq"
            ports = [
              { containerPort = var.amqp_port },
              { containerPort = var.management_port }
            ]
          }
        ]
        restartPolicy = "Always"
      }
    })
  }

  service_account {
    email  = google_service_account.rabbitmq_sa.email
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }

  tags = ["rabbitmq", "allow-ssh"]

  allow_stopping_for_update = true

  depends_on = [google_project_iam_member.rabbitmq_sa_ar_reader_permissions]
}

resource "google_compute_address" "external_ip" {
  name    = "${var.environment}-rabbitmq-external-ip"
  project = var.project_id
  region  = var.region
}

resource "google_compute_firewall" "rabbitmq" {
  name    = "${google_compute_instance.rabbitmq.name}-allow"
  network = var.vpc_network
  project = var.project_id

  allow {
    protocol = "tcp"
    ports    = [var.amqp_port, var.management_port]
  }

  source_ranges = [var.vpc_subnet_cidr, var.vpc_connector_cidr]
  target_tags   = ["rabbitmq"]

  depends_on = [google_compute_instance.rabbitmq]
}

// IAM

resource "google_service_account" "rabbitmq_sa" {
  account_id   = "${google_compute_instance.rabbitmq.name}-sa"
  display_name = "Service Account for RabbitMQ Instance"
  project      = var.project_id
}

resource "google_project_iam_member" "rabbitmq_sa_ar_reader_permissions" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.rabbitmq_sa.email}"
}

data "google_compute_default_service_account" "default" {}

resource "google_project_iam_member" "default_sa_iap_permissions" {
  project = var.project_id
  role    = "roles/iap.tunnelResourceAccessor"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

resource "google_compute_instance_iam_policy" "rabbitmq_instance_iam" {
  project     = var.project_id
  zone        = google_compute_instance.rabbitmq.zone
  instance_name = google_compute_instance.rabbitmq.name
  policy_data = data.google_iam_policy.rabbitmq_policy.policy_data

  depends_on = [
    google_compute_instance.rabbitmq,
    google_service_account.rabbitmq_sa
  ]
}

data "google_iam_policy" "rabbitmq_policy" {
  binding {
    role = "roles/compute.instanceAdmin.v1"
    members = ["serviceAccount:${google_service_account.rabbitmq_sa.email}"]
  }
}

// Output

output "rabbitmq_internal_ip" {
  value       = google_compute_instance.rabbitmq.network_interface[0].network_ip
  description = "The internal IP address of the RabbitMQ instance"
}
