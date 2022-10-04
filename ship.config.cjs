module.exports = {
  installCommand: () => 'npm i --prefer-offline --no-audit --omit=optional',
  publishCommand: () => 'npm publish --tag latest',
};
