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

module "cloud_sql" {
  source        = "../../modules/cloud_sql"
  project_id    = var.project_id
  region        = var.region
  db_version    = var.db_version
  db_tier       = var.db_tier
  database_name = var.database_name
  environment   = var.environment
  authorized_networks = var.authorized_networks
}

module "cloud_run" {
  source                        = "../../modules/cloud_run"
  project_id                    = var.project_id
  region                        = var.region
  app_service_docker_image_name = var.app_service_docker_image_name
  repository_id                 = module.artifact_registry.repository_id
  sql_connection_name           = module.cloud_sql.connection_name
  database_name                 = var.database_name
  db_user_secret                = module.cloud_sql.db_user_secret
  db_password_secret            = module.cloud_sql.db_password_secret
  environment                   = var.environment

  app_api_prefix                    = var.app_api_prefix
  app_api_name                      = var.app_api_name
  app_api_auth_jwt_token_expires_in = var.app_api_auth_jwt_token_expires_in
}

module "ci_cd_service_account" {
  source      = "../../modules/ci_cd_service_account"
  project_id  = var.project_id
  environment = var.environment
}

module "load_balancer_ssl" {
  source          = "../../modules/load_balancer_ssl"
  project_id      = var.project_id
  environment     = var.environment
  cloudrun_neg_id = module.cloud_run.cloudrun_neg_id
  domains         = var.domains
}
