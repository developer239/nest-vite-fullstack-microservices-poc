output "cloud_run_service_url" {
  value = module.cloud_run.cloud_run_service_url
}

output "load_balancer_ip" {
  value = module.load_balancer_ssl.load_balancer_ip
}
