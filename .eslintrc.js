module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['vue', 'prettier'],
  // add your custom rules here
  rules: {},
};
