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
  description = "The environment (e.g., dev, prod)"
  type        = string
  validation {
    condition = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be one of: dev, prod."
  }
}

variable "subnet_cidr" {
  description = "The CIDR range for the subnet"
  type        = string
  default     = "10.0.0.0/24"
  validation {
    condition = can(cidrhost(var.subnet_cidr, 0))
    error_message = "Must be a valid CIDR range."
  }
}

variable "connector_cidr" {
  description = "The CIDR range for the VPC access connector"
  type        = string
  default     = "10.8.0.0/28"
  validation {
    condition = can(cidrhost(var.connector_cidr, 0))
    error_message = "Must be a valid CIDR range."
  }
}

variable "allow_internal_ranges" {
  description = "CIDR ranges to allow internal traffic"
  type = list(string)
  default = []
}

variable "iap_ssh_range" {
  description = "CIDR range for IAP SSH access"
  type        = string
  default     = "35.235.240.0/20"
}

variable "create_nat" {
  description = "Whether to create a NAT gateway"
  type        = bool
  default     = true
}

// Main

resource "google_compute_network" "vpc" {
  project                 = var.project_id
  name                    = "${var.environment}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  project                  = var.project_id
  name                     = "${var.environment}-subnet"
  region                   = var.region
  network                  = google_compute_network.vpc.id
  ip_cidr_range            = var.subnet_cidr
  private_ip_google_access = true

  # TODO: enable logs ?
}

resource "google_compute_router" "router" {
  count   = var.create_nat ? 1 : 0
  name    = "${var.environment}-router"
  network = google_compute_network.vpc.id
  region  = var.region
}

resource "google_compute_router_nat" "nat" {
  count                              = var.create_nat ? 1 : 0
  name                               = "${var.environment}-nat"
  router                             = google_compute_router.router[0].name
  region                             = var.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  depends_on = [google_compute_subnetwork.subnet]
}

resource "google_vpc_access_connector" "connector" {
  project       = var.project_id
  name          = "${var.environment}-connector"
  region        = var.region
  ip_cidr_range = var.connector_cidr
  network       = google_compute_network.vpc.name

  depends_on = [google_compute_subnetwork.subnet]
}

resource "google_compute_global_address" "private_ip_address" {
  name          = "${var.environment}-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc.id
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network = google_compute_network.vpc.id
  service = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}

resource "google_compute_firewall" "allow_internal" {
  project = var.project_id
  name    = "${var.environment}-allow-internal"
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

  source_ranges = concat([var.subnet_cidr, var.connector_cidr], var.allow_internal_ranges)
}

resource "google_compute_firewall" "allow_iap_ssh" {
  project = var.project_id
  name    = "${var.environment}-allow-iap-ssh"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports = ["22"]
  }

  source_ranges = [var.iap_ssh_range]
  target_tags = ["allow-ssh"]
}

resource "google_compute_firewall" "allow_egress" {
  project = var.project_id
  name    = "${var.environment}-allow-egress"
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

  direction = "EGRESS"
  destination_ranges = ["0.0.0.0/0"]
}

// Outputs

output "vpc_self_link" {
  description = "The URI of the VPC network"
  value       = google_compute_network.vpc.self_link
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
  description = "The ID of the subnet"
  value       = google_compute_subnetwork.subnet.id
}

output "subnet_name" {
  description = "The name of the subnet"
  value       = google_compute_subnetwork.subnet.name
}

output "subnet_cidr" {
  description = "The CIDR range of the subnet"
  value       = google_compute_subnetwork.subnet.ip_cidr_range
}

output "vpc_connector_id" {
  description = "The ID of the VPC access connector"
  value       = google_vpc_access_connector.connector.id
}

output "vpc_connector_name" {
  description = "The name of the VPC access connector"
  value       = google_vpc_access_connector.connector.name
}

output "connector_cidr" {
  description = "The CIDR range of the VPC connector"
  value       = google_vpc_access_connector.connector.ip_cidr_range
}
