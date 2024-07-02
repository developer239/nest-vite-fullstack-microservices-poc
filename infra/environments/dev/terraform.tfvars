environment = "dev"
project_id = "template-nestjs-api"
region = "us-central1"
domains = ["dev.template-nestjs-api.com"]

# App
app_api_prefix = "api"
app_api_name = "BE Template API [dev]"
app_api_auth_jwt_token_expires_in = "1d"

# Database
database_name = "api_db"
db_tier= "db-f1-micro"
authorized_networks = [
  {
    name  = "employee-1-home-network"
    value = "86.49.224.158/32"
  }
]
