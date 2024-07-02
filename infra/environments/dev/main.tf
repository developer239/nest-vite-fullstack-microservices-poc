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

module "cloud_run_auth" {
  source           = "../../modules/cloud_run"
  project_id       = var.project_id
  region           = var.region
  environment      = var.environment
  service_name     = "auth-service"
  container_image  = "${var.region}-docker.pkg.dev/${var.project_id}/${module.artifact_registry.repository_id}/${var.environment}-auth-service:latest"
  vpc_connector    = module.vpc.vpc_connector_name
  cloudsql_instance = module.cloud_sql.connection_name

  env_vars = {
    NODE_ENV         = var.environment
    APP_NAME         = "Auth Microservice"
    HTTP_PORT        = "8081"
    AMQP_PORT        = "5672"
    AMQP_QUEUE_NAME  = "auth_queue"
    DATABASE_HOST    = "/cloudsql/${module.cloud_sql.connection_name}"
    DATABASE_NAME    = module.cloud_sql.database_names["auth"]
    RABBITMQ_HOST    = module.rabbitmq.rabbitmq_internal_ip
  }

  secrets = [
    {
      name = "${var.environment}-db-user"
      key  = "latest"
    },
    {
      name = "${var.environment}-db-password"
      key  = "latest"
    },
    {
      name = "${var.environment}-gcp-auth-sa-key"
      key  = "latest"
    }
  ]
}

module "cloud_run_events" {
  source           = "../../modules/cloud_run"
  project_id       = var.project_id
  region           = var.region
  environment      = var.environment
  service_name     = "events-service"
  container_image  = "${var.region}-docker.pkg.dev/${var.project_id}/${module.artifact_registry.repository_id}/${var.environment}-events-service:latest"
  vpc_connector    = module.vpc.vpc_connector_name
  cloudsql_instance = module.cloud_sql.connection_name

  env_vars = {
    NODE_ENV         = var.environment
    APP_NAME         = "Events Microservice"
    HTTP_PORT        = "8082"
    AMQP_PORT        = "5672"
    AMQP_QUEUE_NAME  = "events_queue"
    DATABASE_HOST    = "/cloudsql/${module.cloud_sql.connection_name}"
    DATABASE_NAME    = module.cloud_sql.database_names["events"]
    RABBITMQ_HOST    = module.rabbitmq.rabbitmq_internal_ip
    AUTH_AMQP_QUEUE  = "auth_queue"
  }

  secrets = [
    {
      name = "${var.environment}-db-user"
      key  = "latest"
    },
    {
      name = "${var.environment}-db-password"
      key  = "latest"
    },
    {
      name = "${var.environment}-gcp-auth-sa-key"
      key  = "latest"
    }
  ]
}

module "cloud_run_gateway" {
  source           = "../../modules/cloud_run"
  project_id       = var.project_id
  region           = var.region
  environment      = var.environment
  service_name     = "gateway-service"
  container_image  = "${var.region}-docker.pkg.dev/${var.project_id}/${module.artifact_registry.repository_id}/${var.environment}-gateway-service:latest"
  vpc_connector    = module.vpc.vpc_connector_name

  env_vars = {
    NODE_ENV         = var.environment
    APP_NAME         = "Gateway Microservice"
    HTTP_PORT        = "8080"
    AUTH_HTTP_PORT   = "8081"
    AUTH_HOST        = module.cloud_run_auth.service_url
    EVENTS_HTTP_PORT = "8082"
    EVENTS_HOST      = module.cloud_run_events.service_url
  }
}
