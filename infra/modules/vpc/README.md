<!-- BEGIN_TF_DOCS -->

## Resources

| Name                                                                                                                                                                        | Type     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [google_compute_firewall.allow_egress](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall)                                     | resource |
| [google_compute_firewall.allow_iap_ssh](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall)                                    | resource |
| [google_compute_firewall.allow_internal](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall)                                   | resource |
| [google_compute_global_address.private_ip_address](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_global_address)                   | resource |
| [google_compute_network.vpc](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_network)                                                | resource |
| [google_compute_router.router](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_router)                                               | resource |
| [google_compute_router_nat.nat](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_router_nat)                                          | resource |
| [google_compute_subnetwork.subnet](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_subnetwork)                                       | resource |
| [google_service_networking_connection.private_vpc_connection](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/service_networking_connection) | resource |
| [google_vpc_access_connector.connector](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/vpc_access_connector)                                | resource |

## Inputs

| Name                                                                                             | Description                                 | Type           | Default             | Required |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------- | -------------- | ------------------- | :------: |
| <a name="input_allow_internal_ranges"></a> [allow_internal_ranges](#input_allow_internal_ranges) | CIDR ranges to allow internal traffic       | `list(string)` | `[]`                |    no    |
| <a name="input_connector_cidr"></a> [connector_cidr](#input_connector_cidr)                      | The CIDR range for the VPC access connector | `string`       | `"10.8.0.0/28"`     |    no    |
| <a name="input_create_nat"></a> [create_nat](#input_create_nat)                                  | Whether to create a NAT gateway             | `bool`         | `true`              |    no    |
| <a name="input_environment"></a> [environment](#input_environment)                               | The environment (e.g., dev, prod)           | `string`       | n/a                 |   yes    |
| <a name="input_iap_ssh_range"></a> [iap_ssh_range](#input_iap_ssh_range)                         | CIDR range for IAP SSH access               | `string`       | `"35.235.240.0/20"` |    no    |
| <a name="input_project_id"></a> [project_id](#input_project_id)                                  | The GCP project ID                          | `string`       | n/a                 |   yes    |
| <a name="input_region"></a> [region](#input_region)                                              | The GCP region for resources                | `string`       | n/a                 |   yes    |
| <a name="input_subnet_cidr"></a> [subnet_cidr](#input_subnet_cidr)                               | The CIDR range for the subnet               | `string`       | `"10.0.0.0/24"`     |    no    |

## Outputs

| Name                                                                                                  | Description                          |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------ |
| <a name="output_connector_cidr"></a> [connector_cidr](#output_connector_cidr)                         | The CIDR range of the VPC connector  |
| <a name="output_private_vpc_connection"></a> [private_vpc_connection](#output_private_vpc_connection) | n/a                                  |
| <a name="output_subnet_cidr"></a> [subnet_cidr](#output_subnet_cidr)                                  | The CIDR range of the subnet         |
| <a name="output_subnet_id"></a> [subnet_id](#output_subnet_id)                                        | The ID of the subnet                 |
| <a name="output_subnet_name"></a> [subnet_name](#output_subnet_name)                                  | The name of the subnet               |
| <a name="output_vpc_connector_id"></a> [vpc_connector_id](#output_vpc_connector_id)                   | The ID of the VPC access connector   |
| <a name="output_vpc_connector_name"></a> [vpc_connector_name](#output_vpc_connector_name)             | The name of the VPC access connector |
| <a name="output_vpc_id"></a> [vpc_id](#output_vpc_id)                                                 | The ID of the VPC                    |
| <a name="output_vpc_name"></a> [vpc_name](#output_vpc_name)                                           | The name of the VPC                  |
| <a name="output_vpc_self_link"></a> [vpc_self_link](#output_vpc_self_link)                            | The URI of the VPC network           |

<!-- END_TF_DOCS -->
