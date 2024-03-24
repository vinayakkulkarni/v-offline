module.exports = {
  installCommand: () => 'bun i',
  beforeCommitChanges: ({ exec }) => {
    exec('./scripts/bump-jsr-version.cjs');
  },
};
