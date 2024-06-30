module.exports = {
  extends: [
    '@linters/eslint-config-node',
    '@linters/eslint-config-typescript',
    '@linters/eslint-config-vitest',
    'prettier',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'node/no-extraneous-import': 0,
  },
}
