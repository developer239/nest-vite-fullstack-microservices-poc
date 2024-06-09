module.exports = {
  extends: [
    '@linters/eslint-config-node',
    '@linters/eslint-config-typescript',
    'prettier',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'node/no-extraneous-import': 0,
  },
}
