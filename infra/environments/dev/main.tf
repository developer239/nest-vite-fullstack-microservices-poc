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
  databases = {
    auth = {
      name               = "auth_db"
      user_secret_id     = "dev-auth-db-user"
      password_secret_id = "dev-auth-db-password"
    },
    events = {
      name               = "events_db"
      user_secret_id     = "dev-events-db-user"
      password_secret_id = "dev-events-db-password"
    }
  }
  environment         = var.environment
  vpc_network         = module.vpc.vpc_self_link
  vpc_subnet_cidr = module.vpc.subnet_cidr
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
}

module "cloud_run_auth" {
  source            = "../../modules/cloud_run"
  project_id        = var.project_id
  region            = var.region
  environment       = var.environment
  service_name      = "auth-service"
  docker_image_name = "auth-service"
  repository_id     = module.artifact_registry.repository_id
  vpc_connector     = module.vpc.vpc_connector_name
  cloudsql_instance = module.cloud_sql.connection_name

  env_vars = {
    NODE_ENV        = var.environment
    APP_NAME        = "Auth Microservice"
    DATABASE_HOST   = "/cloudsql/${module.cloud_sql.connection_name}"
    DATABASE_NAME   = module.cloud_sql.database_names["auth"]
    AMQP_HOST       = module.rabbitmq.rabbitmq_internal_ip
    AMQP_PORT       = "5672"
    AMQP_QUEUE_NAME = "auth_queue"
    GCP_AUTH_SA_KEY = module.ci_cd_service_account.ci_cd_key_content
  }

  secrets = [
    {
      secretName   = "dev-auth-db-user"
      variableName = "DATABASE_USER"
      key          = "latest"
    },
    {
      secretName   = "dev-auth-db-password"
      variableName = "DATABASE_PASSWORD"
      key          = "latest"
    }
  ]
}
