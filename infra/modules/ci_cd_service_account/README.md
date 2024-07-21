<!-- BEGIN_TF_DOCS -->

## Resources

| Name                                                                                                                                                                          | Type     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [google_project_iam_member.ci_cd_sa_permissions](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_iam_member)                           | resource |
| [google_secret_manager_secret.ci_cd_key_secret](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/secret_manager_secret)                         | resource |
| [google_secret_manager_secret_version.ci_cd_key_secret_version](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/secret_manager_secret_version) | resource |
| [google_service_account.ci_cd](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/service_account)                                                | resource |
| [google_service_account_key.ci_cd_key](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/service_account_key)                                    | resource |

## Inputs

| Name                                                               | Description            | Type     | Default | Required |
| ------------------------------------------------------------------ | ---------------------- | -------- | ------- | :------: |
| <a name="input_environment"></a> [environment](#input_environment) | Deployment environment | `string` | n/a     |   yes    |
| <a name="input_project_id"></a> [project_id](#input_project_id)    | The GCP project ID     | `string` | n/a     |   yes    |

## Outputs

| Name                                                                                         | Description                                             |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| <a name="output_ci_cd_account_email"></a> [ci_cd_account_email](#output_ci_cd_account_email) | The email address of the service account                |
| <a name="output_ci_cd_key_content"></a> [ci_cd_key_content](#output_ci_cd_key_content)       | The service account key content                         |
| <a name="output_ci_cd_key_secret_id"></a> [ci_cd_key_secret_id](#output_ci_cd_key_secret_id) | The ID of the secret containing the service account key |

<!-- END_TF_DOCS -->
