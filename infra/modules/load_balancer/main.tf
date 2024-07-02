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

// Main

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

resource "google_compute_target_http_proxy" "cloudrun_http_proxy" {
  name    = "${var.project_id}-${var.environment}-http-proxy"
  url_map = google_compute_url_map.cloudrun_url_map.id
}

resource "google_compute_global_forwarding_rule" "cloudrun_forwarding_rule" {
  name       = "${var.project_id}-${var.environment}-forwarding-rule"
  target     = google_compute_target_http_proxy.cloudrun_http_proxy.id
  port_range = "80"
}

// Output

output "load_balancer_ip" {
  value = google_compute_global_forwarding_rule.cloudrun_forwarding_rule.ip_address
}
