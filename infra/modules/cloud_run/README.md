<!-- BEGIN_TF_DOCS -->

## Resources

| Name                                                                                                                                                                              | Type        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [google_cloud_run_service.service](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_service)                                              | resource    |
| [google_cloud_run_service_iam_policy.app_service_iam](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_service_iam_policy)                | resource    |
| [google_compute_region_network_endpoint_group.cloudrun_neg](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_region_network_endpoint_group) | resource    |
| [google_project_iam_member.cloud_run_sa_secret_manager_permissions](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_iam_member)            | resource    |
| [google_project_iam_member.cloud_run_sa_sql_client_permissions](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_iam_member)                | resource    |
| [google_service_account.cloud_run_sa](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/service_account)                                             | resource    |
| [google_iam_policy.cloud_run_policy](https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/iam_policy)                                                | data source |

## Inputs

| Name                                                                                 | Description                                             | Type                                                                                                | Default    | Required |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------- | :------: |
| <a name="input_cloudsql_instance"></a> [cloudsql_instance](#input_cloudsql_instance) | The Cloud SQL instance connection name                  | `string`                                                                                            | `null`     |    no    |
| <a name="input_docker_image_name"></a> [docker_image_name](#input_docker_image_name) | The name of the Docker image for the service            | `string`                                                                                            | n/a        |   yes    |
| <a name="input_docker_image_tag"></a> [docker_image_tag](#input_docker_image_tag)    | The tag of the Docker image to deploy                   | `string`                                                                                            | `"latest"` |    no    |
| <a name="input_env_vars"></a> [env_vars](#input_env_vars)                            | Environment variables for the service                   | `map(string)`                                                                                       | `{}`       |    no    |
| <a name="input_environment"></a> [environment](#input_environment)                   | Deployment environment                                  | `string`                                                                                            | n/a        |   yes    |
| <a name="input_max_instances"></a> [max_instances](#input_max_instances)             | Maximum number of instances to run                      | `number`                                                                                            | `100`      |    no    |
| <a name="input_min_instances"></a> [min_instances](#input_min_instances)             | Minimum number of instances to run                      | `number`                                                                                            | `0`        |    no    |
| <a name="input_project_id"></a> [project_id](#input_project_id)                      | The GCP project ID                                      | `string`                                                                                            | n/a        |   yes    |
| <a name="input_region"></a> [region](#input_region)                                  | The GCP region for resources                            | `string`                                                                                            | n/a        |   yes    |
| <a name="input_repository_id"></a> [repository_id](#input_repository_id)             | Repository ID for the Docker image in Artifact Registry | `string`                                                                                            | n/a        |   yes    |
| <a name="input_secrets"></a> [secrets](#input_secrets)                               | Secrets to mount in the service                         | <pre>list(object({<br> secretName = string<br> variableName = string<br> key = string<br> }))</pre> | `[]`       |    no    |
| <a name="input_service_name"></a> [service_name](#input_service_name)                | The name of the Cloud Run service                       | `string`                                                                                            | n/a        |   yes    |
| <a name="input_use_sql"></a> [use_sql](#input_use_sql)                               | Whether the service uses Cloud SQL                      | `bool`                                                                                              | `false`    |    no    |
| <a name="input_vpc_connector"></a> [vpc_connector](#input_vpc_connector)             | The VPC connector for the Cloud Run service             | `string`                                                                                            | `null`     |    no    |

## Outputs

| Name                                                                 | Description |
| -------------------------------------------------------------------- | ----------- |
| <a name="output_service_url"></a> [service_url](#output_service_url) | n/a         |

<!-- END_TF_DOCS -->
