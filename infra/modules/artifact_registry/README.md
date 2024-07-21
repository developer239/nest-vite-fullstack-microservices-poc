<!-- BEGIN_TF_DOCS -->

## Requirements

No requirements.

## Providers

| Name                                                      | Version |
| --------------------------------------------------------- | ------- |
| <a name="provider_google"></a> [google](#provider_google) | n/a     |

## Modules

No modules.

## Resources

| Name                                                                                                                                                                 | Type     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [google_artifact_registry_repository.docker_repository](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/artifact_registry_repository) | resource |

## Inputs

| Name                                                               | Description                  | Type     | Default | Required |
| ------------------------------------------------------------------ | ---------------------------- | -------- | ------- | :------: |
| <a name="input_environment"></a> [environment](#input_environment) | Deployment environment       | `string` | n/a     |   yes    |
| <a name="input_project_id"></a> [project_id](#input_project_id)    | The GCP project ID           | `string` | n/a     |   yes    |
| <a name="input_region"></a> [region](#input_region)                | The GCP region for resources | `string` | n/a     |   yes    |

## Outputs

| Name                                                                             | Description                                          |
| -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| <a name="output_repository_id"></a> [repository_id](#output_repository_id)       | The ID of the created Artifact Registry repository   |
| <a name="output_repository_name"></a> [repository_name](#output_repository_name) | The name of the created Artifact Registry repository |

<!-- END_TF_DOCS -->
