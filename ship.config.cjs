module.exports = {
  installCommand: () => 'npm i --prefer-offline --no-audit --no-optional',
  publishCommand: () => 'npm publish --tag legacy',
};
