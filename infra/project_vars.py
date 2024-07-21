project_variables = {
    # Project
    "project_id": "fs-microservices",
    "environment": "dev",
    "region": "us-central1",

    # VPC
    "vpc_subnet_cidr": "10.0.0.0/24",
    "vpc_connector_cidr": "10.0.1.0/28",

    # SQL
    "db_version": "POSTGRES_14",
    "db_tier": "db-f1-micro",
    "authorized_networks": [
        {
            "name": "home-network-1",
            "value": "86.49.224.158/32"
        }
    ],
    "databases": {
        "auth": {
            "name": "auth_db",
            "user_secret_id": "dev-auth-db-user",
            "password_secret_id": "dev-auth-db-password"
        },
        "events": {
            "name": "events_db",
            "user_secret_id": "dev-events-db-user",
            "password_secret_id": "dev-events-db-password"
        }
    },

    # RabbitMQ
    "rabbitmq_amqp_port": 5672,
    "rabbitmq_management_port": 15672,

    # Cloud Run
    "cloud_run_services": {
        "auth": {
            "service_name": "auth-service",
            "docker_image_name": "auth-service",
            "use_sql": True,
            "use_rabbitmq": True,
            "use_gcp_auth": True,
            "env_vars": {
                "APP_NAME": "Auth Microservice",
                "AMQP_QUEUE_NAME": "auth_queue"
            },
            "secrets": [
                {
                    "secretName": "dev-auth-db-user",
                    "variableName": "DATABASE_USER",
                    "key": "latest"
                },
                {
                    "secretName": "dev-auth-db-password",
                    "variableName": "DATABASE_PASSWORD",
                    "key": "latest"
                }
            ]
        },
        "events": {
            "service_name": "events-service",
            "docker_image_name": "events-service",
            "use_sql": True,
            "use_rabbitmq": True,
            "use_gcp_auth": True,
            "env_vars": {
                "APP_NAME": "Events Microservice",
                "AMQP_QUEUE_NAME": "auth_queue"
            },
            "secrets": [
                {
                    "secretName": "dev-events-db-user",
                    "variableName": "DATABASE_USER",
                    "key": "latest"
                },
                {
                    "secretName": "dev-events-db-password",
                    "variableName": "DATABASE_PASSWORD",
                    "key": "latest"
                }
            ]
        },
        "gateway": {
            "service_name": "gateway-service",
            "docker_image_name": "gateway-service",
            "env_vars": {
                "APP_NAME": "Gateway Microservice"
            },
            "depends_on": ["auth", "events"]
        },
        "storybook": {
            "service_name": "storybook-service",
            "docker_image_name": "storybook-service"
        },
        "web": {
            "service_name": "web-service",
            "docker_image_name": "web-service",
            "use_firebase": True,
            "env_vars": {
                "VITE_PORT": 8080
            }
        }
    }
}
