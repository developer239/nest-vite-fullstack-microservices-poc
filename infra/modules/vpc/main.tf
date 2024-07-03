// Variables

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
}

variable "subnet_cidr" {
  description = "The CIDR range for the subnet"
  type        = string
  default     = "10.0.0.0/24"
}

variable "connector_cidr" {
  description = "The CIDR range for the VPC access connector"
  type        = string
  default     = "10.8.0.0/28"
}

// Main
resource "google_compute_network" "vpc" {
  project                 = var.project_id
  name                    = "${var.project_id}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  project                 = var.project_id
  name          = "${var.project_id}-vpc-subnet"
  region        = var.region
  network       = google_compute_network.vpc.name
  ip_cidr_range = var.subnet_cidr
}

resource "google_vpc_access_connector" "connector" {
  project                 = var.project_id
  region                  = var.region
  name                    = "${var.project_id}-vpc-connector"
  network                 = google_compute_network.vpc.name
  ip_cidr_range           = var.connector_cidr
}

resource "google_compute_firewall" "allow_internal" {
  project = var.project_id
  name    = "${var.project_id}-firewall-allow-internal"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
  }
  allow {
    protocol = "udp"
  }
  allow {
    protocol = "icmp"
  }

  source_ranges = [var.subnet_cidr, var.connector_cidr]
}

// Output

output "vpc_id" {
  description = "The ID of the VPC"
  value       = google_compute_network.vpc.id
}

output "vpc_name" {
  description = "The name of the VPC"
  value       = google_compute_network.vpc.name
}

output "subnet_id" {
  description = "The ID of the subnet"
  value       = google_compute_subnetwork.subnet.id
}

output "subnet_name" {
  description = "The name of the subnet"
  value       = google_compute_subnetwork.subnet.name
}

output "vpc_connector_id" {
  description = "The ID of the VPC access connector"
  value       = google_vpc_access_connector.connector.id
}

output "vpc_connector_name" {
  description = "The name of the VPC access connector"
  value       = google_vpc_access_connector.connector.name
}
