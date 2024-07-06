// Variables

variable "project_id" {
  type = string
}

variable "region" {
  type = string
}

variable "environment" {
  type = string
}

variable "vpc_network" {
  type = string
}

variable "vpc_subnet" {
  type = string
}

variable "vpc_subnet_cidr" {
  type = string
}

variable "vpc_connector_cidr" {
  type = string
}

variable "machine_type" {
  type    = string
  default = "e2-micro"
}

// Main

locals {
  rabbitmq_image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.project_id}-${var.environment}-repo/${var.environment}-rabbitmq:latest"
}

resource "google_service_account" "rabbitmq_sa" {
  account_id   = "rabbitmq-sa-001"
  display_name = "RabbitMQ Service Account"
  project      = var.project_id
}

resource "google_project_iam_member" "rabbitmq_sa_ar_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.rabbitmq_sa.email}"
}

resource "google_compute_address" "external_ip" {
  name    = "${var.environment}-rabbitmq-external-ip"
  project = var.project_id
  region  = var.region
}


resource "google_compute_instance" "rabbitmq" {
  name         = "${var.environment}-rabbitmq"
  machine_type = var.machine_type
  zone         = "${var.region}-a"

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
        containers = [{
          image = local.rabbitmq_image
          name  = "rabbitmq"
          ports = [
            { containerPort = 5672 },
            { containerPort = 15672 }
          ]
        }]
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
}

resource "google_compute_firewall" "rabbitmq" {
  name    = "${var.project_id}-${var.environment}-allow-rabbitmq"
  network = var.vpc_network

  allow {
    protocol = "tcp"
    ports    = ["5672", "15672"]
  }

  source_ranges = [var.vpc_subnet_cidr, var.vpc_connector_cidr]
  target_tags   = ["rabbitmq"]
}

data "google_compute_default_service_account" "default" {}

resource "google_project_iam_member" "iap_tunnel_user" {
  project = var.project_id
  role    = "roles/iap.tunnelResourceAccessor"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

// Output
output "rabbitmq_internal_ip" {
  value = google_compute_instance.rabbitmq.network_interface[0].network_ip
}
