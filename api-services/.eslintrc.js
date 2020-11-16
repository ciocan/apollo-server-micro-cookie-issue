module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'no-unused-expressions': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-case-declarations': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.ts'],
      },
      typescript: {
        project: './tsconfig.json',
      },
      alias: {
        map: [
          ['utils', './src/utils'],
          ['lib', './src/lib'],
          ['handlers', './src/handlers'],
        ],
      },
    },
  },
}
