<!-- BEGIN_TF_DOCS -->

## Resources

| Name                                                                                                                                                                                                  | Type        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [google-beta_google_firebase_project.default](https://registry.terraform.io/providers/hashicorp/google-beta/latest/docs/resources/google_firebase_project)                                            | resource    |
| [google-beta_google_firebase_web_app.env_specific](https://registry.terraform.io/providers/hashicorp/google-beta/latest/docs/resources/google_firebase_web_app)                                       | resource    |
| [google_identity_platform_default_supported_idp_config.email_password](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/identity_platform_default_supported_idp_config) | resource    |
| [google_project_service.firebase_api](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_service)                                                                 | resource    |
| [google_project_service.identity_platform_api](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_service)                                                        | resource    |
| [google-beta_google_firebase_web_app_config.env_specific](https://registry.terraform.io/providers/hashicorp/google-beta/latest/docs/data-sources/google_firebase_web_app_config)                      | data source |

## Inputs

| Name                                                               | Description                       | Type     | Default | Required |
| ------------------------------------------------------------------ | --------------------------------- | -------- | ------- | :------: |
| <a name="input_environment"></a> [environment](#input_environment) | The environment (e.g., dev, prod) | `string` | n/a     |   yes    |
| <a name="input_project_id"></a> [project_id](#input_project_id)    | The GCP project ID                | `string` | n/a     |   yes    |
| <a name="input_region"></a> [region](#input_region)                | The region for Firebase resources | `string` | n/a     |   yes    |

## Outputs

| Name                                                                                         | Description                  |
| -------------------------------------------------------------------------------------------- | ---------------------------- |
| <a name="output_api_key"></a> [api_key](#output_api_key)                                     | Firebase API Key             |
| <a name="output_app_id"></a> [app_id](#output_app_id)                                        | Firebase App ID              |
| <a name="output_auth_domain"></a> [auth_domain](#output_auth_domain)                         | Firebase Auth Domain         |
| <a name="output_messaging_sender_id"></a> [messaging_sender_id](#output_messaging_sender_id) | Firebase Messaging Sender ID |
| <a name="output_project_id"></a> [project_id](#output_project_id)                            | Firebase Project ID          |
| <a name="output_storage_bucket"></a> [storage_bucket](#output_storage_bucket)                | Firebase Storage Bucket      |

<!-- END_TF_DOCS -->
