// Configuration for `@geoql/vue-doctor` (https://docs.the-doctor.report).
//
// `exclude` REPLACES the built-in default ignore list, so the defaults are
// listed again here. Plain default export (no `defineConfig` import): the CLI
// loads this file through c12 and the package is not a local dependency.
export default {
  exclude: [
    'node_modules',
    'dist',
    'coverage',
    '.wrangler',
    // This file: read by the doctor CLI, never imported by code.
    'doctor.config.ts',
    // AI skill scaffolding (SKILL.md build/validate scripts) — tooling for
    // coding agents, never imported by the library or the demo.
    '.agents/**',
  ],
};
