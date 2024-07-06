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

variable "vpc_network" {
  description = "The name of the VPC network"
  type        = string
}

variable "vpc_subnet" {
  description = "The name of the VPC subnet"
  type        = string
}

variable "machine_type" {
  description = "The machine type for the RabbitMQ instance"
  type        = string
  default     = "e2-micro"
}

variable "zone" {
  description = "The zone for the RabbitMQ instance"
  type        = string
  default     = "" // If left empty, will use the first zone of the provided region
}

variable "vpc_subnet_cidr" {
  description = "The CIDR range of the VPC subnet"
  type        = string
}

variable "vpc_connector_cidr" {
  description = "The CIDR range of the VPC connector"
  type        = string
}

// Main

data "google_compute_zones" "available" {
  region = var.region
}

locals {
  zone = var.zone != "" ? var.zone : data.google_compute_zones.available.names[0]
}

resource "google_compute_instance" "rabbitmq" {
  name         = "${var.project_id}-${var.environment}-rabbitmq"
  machine_type = var.machine_type
  zone         = local.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network    = var.vpc_network
    subnetwork = var.vpc_subnet
  }

  metadata_startup_script = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y rabbitmq-server
    cat <<EOT >> /etc/rabbitmq/rabbitmq.conf
    listeners.tcp.default = 0.0.0.0:5672
    management.tcp.port = 15672
    EOT
    systemctl enable rabbitmq-server
    systemctl start rabbitmq-server
    rabbitmq-plugins enable rabbitmq_management
  EOF

  tags = ["rabbitmq", "allow-ssh"]

  service_account {
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }

  metadata = {
    enable-oslogin = "TRUE"
  }
}

resource "google_compute_firewall" "rabbitmq" {
  name    = "${var.project_id}-${var.environment}-allow-rabbitmq"
  network = var.vpc_network

  allow {
    protocol = "tcp"
    ports    = ["5672", "15672"]
  }

  source_ranges = [var.vpc_subnet_cidr, var.vpc_connector_cidr]
  target_tags = ["rabbitmq"]
}

data "google_compute_default_service_account" "default" {}

resource "google_project_iam_member" "vm_sa_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

// Output

output "rabbitmq_internal_ip" {
  description = "The internal IP address of the RabbitMQ instance"
  value       = google_compute_instance.rabbitmq.network_interface[0].network_ip
}

output "rabbitmq_instance_name" {
  description = "The name of the RabbitMQ instance"
  value       = google_compute_instance.rabbitmq.name
}
