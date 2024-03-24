module.exports = {
  plugins: ['stylelint-prettier'],
  extends: ['stylelint-config-recommended-vue'],
  ignoreFiles: ['node_modules/*', 'src/assets/**'],
  rules: {
    'prettier/prettier': [
      true,
      {
        singleQuote: true,
        tabWidth: 2,
      },
    ],
  },
};
