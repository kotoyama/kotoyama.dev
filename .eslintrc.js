module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es2020: true,
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-else-return': 'warn',
    'no-console': ['warn'],
    'prettier/prettier': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'no-prototype-builtins': 'off',
  },
}
