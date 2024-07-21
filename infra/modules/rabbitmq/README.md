<!-- BEGIN_TF_DOCS -->

## Resources

| Name                                                                                                                                                                | Type        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [google_compute_address.external_ip](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_address)                                | resource    |
| [google_compute_firewall.rabbitmq](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall)                                 | resource    |
| [google_compute_instance.rabbitmq](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_instance)                                 | resource    |
| [google_project_iam_member.iap_tunnel_user](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_iam_member)                      | resource    |
| [google_project_iam_member.rabbitmq_sa_permissions](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_iam_member)              | resource    |
| [google_service_account.rabbitmq_sa](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/service_account)                                | resource    |
| [google_compute_default_service_account.default](https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/compute_default_service_account) | data source |

## Inputs

| Name                                                                                    | Description                                             | Type     | Default      | Required |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ------------ | :------: |
| <a name="input_amqp_port"></a> [amqp_port](#input_amqp_port)                            | The AMQP port for RabbitMQ                              | `number` | `5672`       |    no    |
| <a name="input_enable_public_ip"></a> [enable_public_ip](#input_enable_public_ip)       | Whether to enable a public IP for the RabbitMQ instance | `bool`   | `false`      |    no    |
| <a name="input_environment"></a> [environment](#input_environment)                      | The deployment environment (e.g., dev, prod)            | `string` | n/a          |   yes    |
| <a name="input_machine_type"></a> [machine_type](#input_machine_type)                   | The machine type for the RabbitMQ instance              | `string` | `"e2-micro"` |    no    |
| <a name="input_management_port"></a> [management_port](#input_management_port)          | The management port for RabbitMQ                        | `number` | `15672`      |    no    |
| <a name="input_project_id"></a> [project_id](#input_project_id)                         | The GCP project ID                                      | `string` | n/a          |   yes    |
| <a name="input_region"></a> [region](#input_region)                                     | The GCP region for resources                            | `string` | n/a          |   yes    |
| <a name="input_vpc_connector_cidr"></a> [vpc_connector_cidr](#input_vpc_connector_cidr) | The CIDR range of the VPC connector                     | `string` | n/a          |   yes    |
| <a name="input_vpc_network"></a> [vpc_network](#input_vpc_network)                      | The name of the VPC network                             | `string` | n/a          |   yes    |
| <a name="input_vpc_subnet"></a> [vpc_subnet](#input_vpc_subnet)                         | The name of the VPC subnet                              | `string` | n/a          |   yes    |
| <a name="input_vpc_subnet_cidr"></a> [vpc_subnet_cidr](#input_vpc_subnet_cidr)          | The CIDR range of the VPC subnet                        | `string` | n/a          |   yes    |

## Outputs

| Name                                                                                            | Description                                                   |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| <a name="output_rabbitmq_external_ip"></a> [rabbitmq_external_ip](#output_rabbitmq_external_ip) | The external IP address of the RabbitMQ instance (if enabled) |
| <a name="output_rabbitmq_internal_ip"></a> [rabbitmq_internal_ip](#output_rabbitmq_internal_ip) | The internal IP address of the RabbitMQ instance              |

<!-- END_TF_DOCS -->
