/* eslint-disable import/no-default-export */
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    'http://localhost:8080/graphql',
    'src/modules/auth/local-auth-schema.graphql',
  ],
  documents: 'src/modules/**/*.graphql',
  generates: {
    'src/graphql-generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
}

export default config
