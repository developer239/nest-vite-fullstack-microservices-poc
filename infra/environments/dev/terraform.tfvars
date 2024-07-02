environment = "dev"
project_id = "template-nestjs-api"
region = "us-central1"
domains = ["dev.template-nestjs-api.com"]

# Database
database_name = "api_db"
db_tier= "db-f1-micro"
authorized_networks = [
  {
    name  = "employee-1-home-network"
    value = "86.49.224.158/32"
  }
]
