# V-Offline ⚡️

<!-- Badges -->

[![Pipeline](https://img.shields.io/github/actions/workflow/status/vinayakkulkarni/v-offline/pipeline.yml?branch=main&logo=github-actions&label=pipeline)](https://github.com/vinayakkulkarni/v-offline/actions/workflows/pipeline.yml)
[![Doctor](https://img.shields.io/badge/doctor-audited-2ea043?logo=vuedotjs&label=doctor)](https://github.com/geoql/doctor)
[![GitHub release](https://img.shields.io/github/v/release/vinayakkulkarni/v-offline?sort=semver&logo=github&label=release)](https://github.com/vinayakkulkarni/v-offline/releases)
[![npm](https://img.shields.io/npm/v/v-offline?logo=npm&label=npm)](https://www.npmjs.com/package/v-offline)
[![JSR](https://img.shields.io/jsr/v/@vinayakkulkarni/v-offline?logo=jsr&label=jsr)](https://jsr.io/@vinayakkulkarni/v-offline)
[![npm downloads](https://img.shields.io/npm/dm/v-offline?logo=npm&label=downloads)](http://npm-stat.com/charts.html?package=v-offline)
[![bundle size](https://img.shields.io/bundlephobia/minzip/v-offline?label=size)](https://bundlephobia.com/package/v-offline@latest)
[![types](https://img.shields.io/npm/types/v-offline?logo=typescript&label=types)](https://github.com/vinayakkulkarni/v-offline/blob/main/package.json)
[![License](https://img.shields.io/github/license/vinayakkulkarni/v-offline?logo=github&label=license)](./LICENSE)

[![vite-plus](https://img.shields.io/github/package-json/dependency-version/vinayakkulkarni/v-offline/dev/vite-plus?logo=vite&label=vite-plus)](https://github.com/voidzero-dev/vite-plus)
[![typescript](https://img.shields.io/github/package-json/dependency-version/vinayakkulkarni/v-offline/dev/typescript?logo=TypeScript&label=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/github/package-json/packageManager/vinayakkulkarni/v-offline?label=pnpm&logo=pnpm)](https://pnpm.io/)
[![node](https://img.shields.io/node/v/v-offline?logo=node.js&label=node)](https://nodejs.org/)

<!-- End Badges -->

⚠️ Docs are for Vue 3, for Vue 2 docs, [click here](https://github.com/vinayakkulkarni/v-offline#v-offline-%EF%B8%8F)

## Features

- Detect offline & online events for your vue app.
- Built from scratch usign Vue 2 & Composition API with TypeScript
- For Vue >3.x version – `pnpm add v-offline@latest`
- For Vue >=2.7 version – `pnpm add v-offline@legacy`
- For Vue <2.7 version – `pnpm add v-offline@2.3.0`

## Table of Contents

- [V-Offline ⚡️](#v-offline-️)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Requirements](#requirements)
    - [Installation](#installation)
    - [Build Setup](#build-setup)
    - [Usage](#usage)
    - [Example](#example)
  - [API](#api)
    - [Props](#props)
    - [Events](#events)
  - [Contributing](#contributing)
  - [Author](#author)
  - [License](#license)

## Demo

Live demo: **[v-offline.vinayakkulkarni.dev](https://v-offline.vinayakkulkarni.dev)**. The demo source is in [`example/`](./example). Run it locally with `pnpm run demo:dev`.

## Requirements

- [vue](https://vuejs.org/) `^3.x`

### Installation

```sh
pnpm add v-offline ping.js
```

CDN: [UNPKG](https://unpkg.com/v-offline/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-offline/dist/) (available as `window.VOffline`)

### Build Setup

```bash
# install dependencies
$ pnpm install

# package the library
$ pnpm run build

# build the demo and deploy it to Cloudflare Workers
$ pnpm run deploy
```

### Usage

Global component:

```js
// main.ts
import { VOffline } from 'v-offline';
import { createApp } from 'vue';

const app = createApp({});
app.component('VOffline', VOffline);
```

Or use locally

```js
// component.vue
<script lang="ts">
import { defineComponent } from 'vue';
import { VOffline } from 'v-offline';

export default defineComponent({
  components: {
    VOffline,
  },
});
</script>
```

For Nuxt 3, create a file in `plugins/v-offline.ts`

```js
import { VOffline } from 'v-offline';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VOffline', VOffline);
});
```

then import the file in `nuxt.config.{j|t}s`:

```js
export default {
  // ...
  plugins: [
    // ...
    { src: '~/plugins/v-offline', mode: 'client' },
    // ...
  ],
  // ...
};
```

### Example

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { VOffline } from 'v-offline';

  const online = ref(navigator.onLine);
  function onNetworkChange(status: boolean) {
    online.value = status;
  }
</script>

<template>
  <VOffline
    online-class="online"
    offline-class="offline"
    @detected-condition="onNetworkChange"
  >
    <p>{{ online ? 'You are online' : 'You are offline' }}</p>
  </VOffline>
</template>
```

## API

### Props

| Name            | Type   | Required? | Default            | Description                                                 |
| --------------- | ------ | --------- | ------------------ | ----------------------------------------------------------- |
| `online-class`  | String | No        | ''                 | Styling the `div` which you want to give if you're online.  |
| `offline-class` | String | No        | ''                 | Styling the `div` which you want to give if you're offline. |
| `ping-url`      | String | No        | https://google.com | Pinging any url to double check if you're online or not.    |

### Events

| Name                  | Returns | Description           |
| --------------------- | ------- | --------------------- |
| `@detected-condition` | String  | Emits a boolean value |

## Contributing

1. Fork it ( [https://github.com/vinayakkulkarni/v-offline/fork](https://github.com/vinayakkulkarni/v-offline/fork) )
2. Create your feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -Sam 'feat: add feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Create a new [Pull Request](https://github.com/vinayakkulkarni/v-offline/compare)

_Note_:

1. Please contribute using [GitHub Flow](https://web.archive.org/web/20191104103724/https://guides.github.com/introduction/flow/)
2. Commits & PRs will be allowed only if the commit messages & PR titles follow the [conventional commit standard](https://www.conventionalcommits.org/), _read more about it [here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)_
3. PS. Ensure your commits are signed. _[Read why](https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html)_

## Author

**v-offline** &copy; [Vinayak](https://vinayakkulkarni.dev), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Vinayak Kulkarni with help from contributors ([list](https://github.com/vinayakkulkarni/v-offline/contributors)).

> [vinayakkulkarni.dev](https://vinayakkulkarni.dev) · GitHub [@vinayakkulkarni](https://github.com/vinayakkulkarni) · Twitter [@\_vinayak_k](https://twitter.com/_vinayak_k)

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-offline.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-offline?ref=badge_large)
