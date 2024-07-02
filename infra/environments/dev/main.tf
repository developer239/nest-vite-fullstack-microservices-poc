provider "google" {
  project = var.project_id
  region  = var.region
}

module "artifact_registry" {
  source      = "../../modules/artifact_registry"
  project_id  = var.project_id
  region      = var.region
  environment = var.environment
}

module "ci_cd_service_account" {
  source      = "../../modules/ci_cd_service_account"
  project_id  = var.project_id
  environment = var.environment
}

module "vpc" {
  source = "../../modules/vpc"

  project_id     = var.project_id
  region         = var.region
  subnet_cidr    = "10.0.0.0/24"
  connector_cidr = "10.0.1.0/28"
}

module "cloud_sql" {
  source     = "../../modules/cloud_sql"
  project_id = var.project_id
  region     = var.region
  db_version = var.db_version
  db_tier    = var.db_tier
  databases  = {
    auth   = { name = "auth_db" },
    events = { name = "events_db" }
  }
  environment = var.environment
  vpc_network = module.vpc.vpc_name
  authorized_networks = var.authorized_networks
}

module "rabbitmq" {
  source      = "../../modules/rabbitmq"
  project_id  = var.project_id
  region      = var.region
  environment = var.environment
  vpc_network = module.vpc.vpc_name
}
