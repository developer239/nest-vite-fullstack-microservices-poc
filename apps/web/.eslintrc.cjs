module.exports = {
  extends: [
    '@linters/eslint-config-react',
    '@linters/eslint-config-typescript',
    'prettier',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'node/no-extraneous-import': 0,
  },
}
