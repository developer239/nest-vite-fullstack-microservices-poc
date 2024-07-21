# Project

project_id  = "nest-vite-fs-microservices"
environment = "dev"
region = "us-central1"

# VPC

vpc_subnet_cidr = "10.0.0.0/24"
vpc_connector_cidr = "10.0.1.0/28"

# SQL

db_version = "POSTGRES_14"
db_tier = "db-f1-micro"
authorized_networks = [
  {
    name  = "home-network-1"
    value = "86.49.224.158/32"
  }
]
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

# RabbitMQ

rabbitmq_amqp_port = 5672
rabbitmq_management_port = 15672
