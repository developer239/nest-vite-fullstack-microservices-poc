provider "google" {
  project = var.project_id
  region  = var.region
}

module "firebase" {
  source      = "../../modules/firebase"
  project_id  = var.project_id
  environment = var.environment
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
  source         = "../../modules/vpc"
  project_id     = var.project_id
  region         = var.region
  environment    = var.environment
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
  authorized_networks = var.authorized_networks
  vpc_connection      = module.vpc.private_vpc_connection

  depends_on = [module.vpc]
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
  docker_image_name  = var.rabbitmq_docker_image_name
  docker_image_tag   = var.rabbitmq_docker_image_tag

  depends_on = [module.vpc]
}

module "cloud_run_auth" {
  source            = "../../modules/cloud_run"
  project_id        = var.project_id
  region            = var.region
  environment       = var.environment
  service_name      = var.cloud_run_services.auth.service_name
  docker_image_name = var.cloud_run_services.auth.docker_image_name
  repository_id     = module.artifact_registry.repository_id
  vpc_connector     = module.vpc.vpc_connector_name
  cloudsql_instance = module.cloud_sql.connection_name
  use_sql           = true
  min_instances     = var.cloud_run_services.auth.min_instances
  max_instances     = var.cloud_run_services.auth.max_instances

  env_vars = merge(
    var.cloud_run_services.auth.env_vars,
    {
      NODE_ENV        = var.environment
      DATABASE_HOST   = "/cloudsql/${module.cloud_sql.connection_name}"
      DATABASE_NAME   = module.cloud_sql.database_names["auth"]
      AMQP_HOST       = module.rabbitmq.rabbitmq_internal_ip
      AMQP_PORT       = var.rabbitmq_amqp_port
      GCP_AUTH_SA_KEY = module.ci_cd_service_account.ci_cd_key_content
    }
  )

  secrets = var.cloud_run_services.auth.secrets

  depends_on = [module.vpc, module.cloud_sql, module.rabbitmq]
}

module "cloud_run_events" {
  source            = "../../modules/cloud_run"
  project_id        = var.project_id
  region            = var.region
  environment       = var.environment
  service_name      = var.cloud_run_services.events.service_name
  docker_image_name = var.cloud_run_services.events.docker_image_name
  repository_id     = module.artifact_registry.repository_id
  vpc_connector     = module.vpc.vpc_connector_name
  cloudsql_instance = module.cloud_sql.connection_name
  use_sql           = true
  min_instances     = var.cloud_run_services.events.min_instances
  max_instances     = var.cloud_run_services.events.max_instances

  env_vars = merge(
    var.cloud_run_services.events.env_vars,
    {
      NODE_ENV        = var.environment
      DATABASE_HOST   = "/cloudsql/${module.cloud_sql.connection_name}"
      DATABASE_NAME   = module.cloud_sql.database_names["events"]
      AMQP_HOST       = module.rabbitmq.rabbitmq_internal_ip
      AMQP_PORT       = var.rabbitmq_amqp_port
      GCP_AUTH_SA_KEY = module.ci_cd_service_account.ci_cd_key_content
    }
  )

  secrets = var.cloud_run_services.events.secrets

  depends_on = [module.vpc, module.cloud_sql, module.rabbitmq]
}

module "cloud_run_gateway" {
  source            = "../../modules/cloud_run"
  project_id        = var.project_id
  region            = var.region
  environment       = var.environment
  service_name      = var.cloud_run_services.gateway.service_name
  docker_image_name = var.cloud_run_services.gateway.docker_image_name
  repository_id     = module.artifact_registry.repository_id
  vpc_connector     = module.vpc.vpc_connector_name
  min_instances     = var.cloud_run_services.gateway.min_instances
  max_instances     = var.cloud_run_services.gateway.max_instances

  env_vars = merge(
    var.cloud_run_services.gateway.env_vars,
    {
      NODE_ENV   = var.environment
      AUTH_URL   = module.cloud_run_auth.service_url
      EVENTS_URL = module.cloud_run_events.service_url
    }
  )

  depends_on = [module.vpc, module.cloud_run_auth, module.cloud_run_events]
}

module "cloud_run_storybook" {
  source            = "../../modules/cloud_run"
  project_id        = var.project_id
  region            = var.region
  environment       = var.environment
  service_name      = var.cloud_run_services.storybook.service_name
  docker_image_name = var.cloud_run_services.storybook.docker_image_name
  repository_id     = module.artifact_registry.repository_id
  vpc_connector     = module.vpc.vpc_connector_name
  min_instances     = var.cloud_run_services.storybook.min_instances
  max_instances     = var.cloud_run_services.storybook.max_instances

  env_vars = merge(
    var.cloud_run_services.storybook.env_vars,
    {
      NODE_ENV = var.environment
    }
  )

  depends_on = [module.vpc]
}

module "cloud_run_web" {
  source            = "../../modules/cloud_run"
  project_id        = var.project_id
  region            = var.region
  environment       = var.environment
  service_name      = var.cloud_run_services.web.service_name
  docker_image_name = var.cloud_run_services.web.docker_image_name
  repository_id     = module.artifact_registry.repository_id
  vpc_connector     = module.vpc.vpc_connector_name
  min_instances     = var.cloud_run_services.web.min_instances
  max_instances     = var.cloud_run_services.web.max_instances

  env_vars = merge(
    var.cloud_run_services.web.env_vars,
    {
      NODE_ENV                         = var.environment
      VITE_GRAPHQL_URI                 = "${module.cloud_run_gateway.service_url}/graphql"
      VITE_GRAPHQL_API_KEY             = module.firebase.api_key
      VITE_GRAPHQL_AUTH_DOMAIN         = module.firebase.auth_domain
      VITE_GRAPHQL_PROJECT_ID          = module.firebase.project_id
      VITE_GRAPHQL_STORAGE_BUCKET      = module.firebase.storage_bucket
      VITE_GRAPHQL_MESSAGING_SENDER_ID = module.firebase.messaging_sender_id
      VITE_GRAPHQL_APP_ID              = module.firebase.app_id
    }
  )

  depends_on = [module.vpc, module.firebase, module.cloud_run_gateway]
}
