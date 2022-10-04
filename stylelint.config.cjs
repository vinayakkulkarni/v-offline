module.exports = {
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-standard',
    'stylelint-config-recommended',
  ],
  ignoreFiles: ['node_modules/*', 'src/assets/**', 'build/**'],
  defaultSeverity: 'error',
  customSyntax: 'postcss-html',
  rules: {},
};
