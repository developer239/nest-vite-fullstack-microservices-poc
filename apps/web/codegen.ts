/* eslint-disable import/no-default-export */
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  documents: 'src/queries/*.graphql',
  generates: {
    'src/_gql-generated/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
