<!-- BEGIN_TF_DOCS -->

## Resources

| Name                                                                                                                                                                  | Type        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [google_compute_global_address.private_ip_address](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_global_address)             | resource    |
| [google_project_iam_member.default_sa_cloudsql_client_permissions](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_iam_member) | resource    |
| [google_project_iam_member.default_sa_secret_manager_permissions](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_iam_member)  | resource    |
| [google_sql_database.databases](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database)                                          | resource    |
| [google_sql_database_instance.postgres_instance](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance)                | resource    |
| [google_sql_user.database_users](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_user)                                             | resource    |
| [google_compute_default_service_account.default](https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/compute_default_service_account)   | data source |
| [google_secret_manager_secret_version.db_passwords](https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/secret_manager_secret_version)  | data source |
| [google_secret_manager_secret_version.db_usernames](https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/secret_manager_secret_version)  | data source |

## Inputs

| Name                                                                                       | Description                                                       | Type                                                                                                          | Default         | Required |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------- | :------: |
| <a name="input_authorized_networks"></a> [authorized_networks](#input_authorized_networks) | List of authorized networks with their names and IP ranges        | <pre>list(object({<br> name = string<br> value = string<br> }))</pre>                                         | `[]`            |    no    |
| <a name="input_databases"></a> [databases](#input_databases)                               | Configuration for databases                                       | <pre>map(object({<br> name = string<br> user_secret_id = string<br> password_secret_id = string<br> }))</pre> | n/a             |   yes    |
| <a name="input_db_tier"></a> [db_tier](#input_db_tier)                                     | The tier of the database                                          | `string`                                                                                                      | `"db-f1-micro"` |    no    |
| <a name="input_db_version"></a> [db_version](#input_db_version)                            | The version of PostgreSQL                                         | `string`                                                                                                      | `"POSTGRES_14"` |    no    |
| <a name="input_environment"></a> [environment](#input_environment)                         | Deployment environment                                            | `string`                                                                                                      | n/a             |   yes    |
| <a name="input_project_id"></a> [project_id](#input_project_id)                            | The GCP project ID                                                | `string`                                                                                                      | n/a             |   yes    |
| <a name="input_region"></a> [region](#input_region)                                        | The GCP region for resources                                      | `string`                                                                                                      | n/a             |   yes    |
| <a name="input_vpc_connection"></a> [vpc_connection](#input_vpc_connection)                | The VPC connection resource (for dependency only)                 | `any`                                                                                                         | n/a             |   yes    |
| <a name="input_vpc_network"></a> [vpc_network](#input_vpc_network)                         | The self_link of the VPC network to use for the database instance | `string`                                                                                                      | n/a             |   yes    |

## Outputs

| Name                                                                                      | Description |
| ----------------------------------------------------------------------------------------- | ----------- |
| <a name="output_connection_name"></a> [connection_name](#output_connection_name)          | n/a         |
| <a name="output_database_names"></a> [database_names](#output_database_names)             | n/a         |
| <a name="output_instance_name"></a> [instance_name](#output_instance_name)                | n/a         |
| <a name="output_private_ip_address"></a> [private_ip_address](#output_private_ip_address) | n/a         |

<!-- END_TF_DOCS -->
