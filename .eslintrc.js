module.exports = {
  extends: [
    '@linters/eslint-config-node',
    '@linters/eslint-config-typescript',
    '@linters/eslint-config-jest',
    'prettier',
  ],
  rules: {
    'no-void': 0
  },
}
