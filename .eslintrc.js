module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    lib: ['es2020'],
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', 'prettier', 'jsdoc', 'security', '@typescript-eslint'],
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:security/recommended',
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
