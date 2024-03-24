module.exports = {
  root: true,
  env: {
    browser: true,
    node: false,
    es2022: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    lib: ['es2022'],
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    extraFileExtensions: ['.vue'],
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsdoc',
    'prettier',
    'security',
    'vue',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsdoc/recommended',
    'plugin:security/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-unresolved': 'off',
  },
};
