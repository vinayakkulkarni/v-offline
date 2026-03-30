import Vue from 'unplugin-vue/rolldown';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    format: ['esm'],
    platform: 'neutral',
    sourcemap: true,
    dts: { vue: true },
    plugins: [Vue({ isProduction: true })],
    deps: {
      neverBundle: ['vue', 'ping.js'],
    },
  },
  fmt: {
    printWidth: 80,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    vueIndentScriptAndStyle: true,
    ignorePatterns: [
      '.nuxt',
      '.output',
      'dist',
      'node_modules',
      '.wrangler',
      'coverage',
      '*.min.js',
      '*.min.css',
      'bun.lock',
      '**/CHANGELOG.md',
      '**/jsr.json',
    ],
  },
});
