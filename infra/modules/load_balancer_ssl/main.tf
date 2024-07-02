// Variables

variable "project_id" {
  description = "The GCP project ID"
}

variable "environment" {
  description = "Deployment environment"
}

variable "cloudrun_neg_id" {
  description = "The ID of the Cloud Run Network Endpoint Group"
}

variable "domains" {
  description = "The domains for the load balancer"
  type        = list(string)
}

// Main

resource "google_compute_managed_ssl_certificate" "default" {
  provider = google
  name     = "${var.project_id}-${var.environment}-ssl-cert"
  managed {
    domains = var.domains
  }
}

resource "google_compute_backend_service" "cloudrun_backend_service" {
  name        = "${var.project_id}-${var.environment}-backend-service"
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 30

  backend {
    group = var.cloudrun_neg_id
  }
}

resource "google_compute_url_map" "cloudrun_url_map" {
  name            = "${var.project_id}-${var.environment}-url-map"
  default_service = google_compute_backend_service.cloudrun_backend_service.id
}

resource "google_compute_target_https_proxy" "default" {
  name             = "${var.project_id}-${var.environment}-https-proxy"
  url_map          = google_compute_url_map.cloudrun_url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

resource "google_compute_global_forwarding_rule" "cloudrun_forwarding_rule" {
  name       = "${var.project_id}-${var.environment}-https-forwarding-rule"
  target     = google_compute_target_https_proxy.default.id
  port_range = "443"
}

// Output

output "load_balancer_ip" {
  value = google_compute_global_forwarding_rule.cloudrun_forwarding_rule.ip_address
}
