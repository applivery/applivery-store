module.exports = {
  extends: ['plugin:jest/recommended'],
  plugins: ['cypress'],
  env: {
    'cypress/globals': true,
  },
  rules: {
    'jest/valid-expect': 0,
    'jest/prefer-to-have-length': 0,
  },
}
