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
  subnet_cidr    = var.vpc_subnet_cidr
  connector_cidr = var.vpc_connector_cidr
}

module "cloud_sql" {
  source              = "../../modules/cloud_sql"
  project_id          = var.project_id
  region              = var.region
  db_version          = var.db_version
  db_tier             = var.db_tier
  databases           = var.databases
  environment         = var.environment
  vpc_network         = module.vpc.vpc_self_link
  vpc_subnet_cidr     = module.vpc.subnet_cidr
  authorized_networks = var.authorized_networks
}

module "rabbitmq" {
  source             = "../../modules/rabbitmq"
  project_id         = var.project_id
  region             = var.region
  environment        = var.environment
  vpc_network        = module.vpc.vpc_name
  vpc_subnet         = module.vpc.subnet_name
  vpc_subnet_cidr    = module.vpc.subnet_cidr
  vpc_connector_cidr = module.vpc.connector_cidr
  amqp_port          = var.rabbitmq_amqp_port
  management_port    = var.rabbitmq_management_port
}

module "firebase" {
  source     = "../../modules/firebase"
  project_id = var.project_id
}

module "cloud_run_services" {
  for_each = var.cloud_run_services

  source            = "../../modules/cloud_run"
  project_id        = var.project_id
  region            = var.region
  environment       = var.environment
  service_name      = each.value.service_name
  docker_image_name = each.value.docker_image_name
  repository_id     = module.artifact_registry.repository_id
  vpc_connector     = module.vpc.vpc_connector_name
  cloudsql_instance = each.value.use_sql ? module.cloud_sql.connection_name : null
  use_sql           = each.value.use_sql
  min_instances     = each.value.min_instances
  max_instances     = each.value.max_instances

  env_vars = merge(
    each.value.env_vars,
    {
      NODE_ENV = var.environment
    },
      each.value.use_sql ? {
      DATABASE_HOST = "/cloudsql/${module.cloud_sql.connection_name}"
      DATABASE_NAME = module.cloud_sql.database_names[each.key]
    } : {},
      each.value.use_rabbitmq ? {
      AMQP_HOST = module.rabbitmq.rabbitmq_internal_ip
      AMQP_PORT = var.rabbitmq_amqp_port
    } : {},
      each.value.use_gcp_auth ? {
      GCP_AUTH_SA_KEY = module.ci_cd_service_account.ci_cd_key_content
    } : {},
      each.value.use_firebase ? {
      VITE_GRAPHQL_URI                 = "${module.cloud_run_services["gateway"].service_url}/graphql"
      VITE_GRAPHQL_API_KEY             = module.firebase.api_key
      VITE_GRAPHQL_AUTH_DOMAIN         = module.firebase.auth_domain
      VITE_GRAPHQL_PROJECT_ID          = module.firebase.project_id
      VITE_GRAPHQL_STORAGE_BUCKET      = module.firebase.storage_bucket
      VITE_GRAPHQL_MESSAGING_SENDER_ID = module.firebase.messaging_sender_id
      VITE_GRAPHQL_APP_ID              = module.firebase.app_id
    } : {}
  )

  secrets = each.value.secrets

  depends_on = [module.firebase, module.vpc]
}
