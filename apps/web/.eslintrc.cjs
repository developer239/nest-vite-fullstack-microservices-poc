module.exports = {
  extends: [
    '@linters/eslint-config-react',
    '@linters/eslint-config-typescript',
    'prettier',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'node/no-extraneous-import': 0,
    '@typescript-eslint/no-misused-promises': 0,
    'react/require-default-props': 0,
  },
  ignorePatterns: ['src/graphql-generated.ts'],
}
