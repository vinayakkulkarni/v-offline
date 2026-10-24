# AGENTS.md - v-offline

> **For AI Coding Assistants (Claude Code, Cursor, Copilot, etc.)**

---

## Overview

**v-offline** (`v-offline`) -- Offline and Online detection components for Vue.

- **Owner**: vinayakkulkarni
- **npm**: `v-offline`
- **Framework**: Vue 3 (Composition API + `<script setup>`)

---

## Project Structure

```
v-offline/
├── src/
│   ├── components/     # VOffline component
│   ├── index.ts        # Public exports
│   └── install.ts      # Vue plugin installer
├── example/            # Demo app (deployed as the v-offline-demo Worker)
├── dist/               # Built output (ESM only)
├── wrangler.jsonc      # Demo Worker config
├── package.json
├── vite.config.ts
├── tsconfig.json
└── AGENTS.md
```

---

## Tech Stack & Tooling

| Need        | Tool                              |
| ----------- | --------------------------------- |
| Build       | vite-plus (vp pack)               |
| Types       | rolldown-plugin-dts (via vp pack) |
| Linting     | vp lint (oxlint bundled)          |
| Formatting  | vp fmt (oxfmt bundled)            |
| Package Mgr | pnpm                              |
| Git Hooks   | Husky + lint-staged + commitlint  |
| Release     | release-please                    |
| Tests       | vp test (Vitest + happy-dom)      |
| Demo        | Vite + Vue in `example/`          |
| Demo deploy | wrangler (Cloudflare Workers)     |
| Node        | 26                                |

---

## Commands

```bash
pnpm run lint          # vp lint
pnpm run lint:fix      # vp lint --fix
pnpm run format        # vp fmt
pnpm run format:check  # vp fmt --check
pnpm run build         # vp pack (tsdown + dts)
pnpm run typecheck     # vue-tsc --noEmit
pnpm run test          # vp test run
pnpm run demo:dev      # demo dev server
pnpm run demo:build    # build the package and the demo
pnpm run deploy        # build and deploy the demo to v-offline.vinayakkulkarni.dev
```

---

## Rules

### Rule #1: TypeScript Required

All code must be TypeScript. No `.js` files except configs.

### Rule #2: No `any` Type

Use proper types. Never use `as any`, `@ts-ignore`, or `@ts-expect-error`.

### Rule #3: Vue 3 Composition API Only

Use `<script setup lang="ts">` exclusively. No Options API.

### Rule #4: ESM Only

Output is ES modules only. No CommonJS or UMD.

### Rule #5: Compiler Macros

`defineProps`, `defineEmits`, `defineModel`, `defineExpose` are compiler macros -- do NOT import them from 'vue'.

### Rule #6: Conventional Commits

All commits must follow conventional commit format with `Signed-off-by` trailer.

---

## Dependencies

| Dependency | Type           |
| ---------- | -------------- |
| `vue`      | peer           |
| `ping.js`  | peer + runtime |

---

**Last Updated:** 2026-02-08
**Maintainer:** Vinayak Kulkarni
