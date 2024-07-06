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
  project       = var.project_id
  name          = "${var.project_id}-vpc-subnet"
  region        = var.region
  network       = google_compute_network.vpc.id
  ip_cidr_range = var.subnet_cidr
}

resource "google_vpc_access_connector" "connector" {
  project       = var.project_id
  name          = "${substr(var.project_id, 0, 10)}-vpc-connector"
  region        = var.region
  ip_cidr_range = var.connector_cidr
  network       = google_compute_network.vpc.name
}

resource "google_compute_global_address" "private_ip_address" {
  name          = "${var.project_id}-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc.id
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
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

output "vpc_self_link" {
  value       = google_compute_network.vpc.self_link
  description = "The URI of the VPC network"
}

output "vpc_id" {
  description = "The ID of the VPC"
  value       = google_compute_network.vpc.id
}

output "vpc_name" {
  description = "The name of the VPC"
  value       = google_compute_network.vpc.name
}

output "subnet_id" {
  value = google_compute_subnetwork.subnet.id
}

output "subnet_name" {
  value = google_compute_subnetwork.subnet.name
}

output "vpc_connector_id" {
  description = "The ID of the VPC access connector"
  value       = google_vpc_access_connector.connector.id
}

output "vpc_connector_name" {
  description = "The name of the VPC access connector"
  value       = google_vpc_access_connector.connector.name
}

output "subnet_cidr" {
  value = google_compute_subnetwork.subnet.ip_cidr_range
}
