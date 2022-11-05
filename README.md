# V-Offline ⚡️

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vinayakkulkarni/v-offline/ci?logo=github-actions)](https://github.com/vinayakkulkarni/v-offline/actions/workflows/ci.yml)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vinayakkulkarni/v-offline/Ship%20js%20trigger?label=⛴%20Ship.js%20trigger)](https://github.com/vinayakkulkarni/v-offline/actions/workflows/shipjs-trigger.yml)
[![npm](https://img.shields.io/npm/dm/v-offline?logo=npm)](http://npm-stat.com/charts.html?package=v-offline)
[![npm](https://img.shields.io/npm/v/v-offline/latest?logo=npm)](https://www.npmjs.com/package/v-offline)
[![npm bundle size (version)](https://img.shields.io/bundlephobia/min/v-offline/latest?label=@latest%20size&logo=vue.js)](https://bundlephobia.com/package/v-offline@latest)
[![npm](https://img.shields.io/npm/v/v-offline/legacy?logo=npm)](https://www.npmjs.com/package/v-offline)
[![npm bundle size (version)](https://img.shields.io/bundlephobia/min/v-offline/legacy?label=@legacy%20size&logo=vue.js)](https://bundlephobia.com/package/v-offline@legacy)
[![npm type definitions](https://img.shields.io/npm/types/v-offline)](https://github.com/vinayakkulkarni/v-offline/blob/master/package.json)
[![DeepScan grade](https://deepscan.io/api/teams/9055/projects/16121/branches/339368/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9055&pid=16121&bid=339368)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/vinayakkulkarni/v-offline)](https://snyk.io/test/github/vinayakkulkarni/v-offline)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/vinayakkulkarni/v-offline?logo=lgtm)](https://lgtm.com/projects/g/vinayakkulkarni/v-offline/alerts/)
[![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/vinayakkulkarni/v-offline?logo=lgtm)](https://lgtm.com/projects/g/vinayakkulkarni/v-offline/context:javascript)
[![GitHub contributors](https://img.shields.io/github/contributors/vinayakkulkarni/v-offline?logo=github)](https://github.com/vinayakkulkarni/v-offline/graphs/contributors)
[![FOSSA](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-offline.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-offline?ref=badge_shield)

[![eslint](https://img.shields.io/npm/dependency-version/v-offline/dev/eslint?logo=eslint)](https://eslint.org/)
[![prettier](https://img.shields.io/npm/dependency-version/v-offline/dev/prettier?logo=prettier)](https://prettier.io/)
[![rollup](https://img.shields.io/npm/dependency-version/v-offline/dev/rollup?logo=rollup.js)](https://rollupjs.org/guide/en/)
[![vue](https://img.shields.io/npm/dependency-version/v-offline/dev/vue?logo=vue.js)](https://vuejs.org/)
[![typescript](https://img.shields.io/npm/dependency-version/v-offline/dev/typescript?logo=TypeScript)](https://www.typescriptlang.org/)

⚠️ Docs are for Vue 3, for Vue 2 docs, [click here](https://github.com/vinayakkulkarni/v-offline#v-offline-%EF%B8%8F)

## Features

- Detect offline & online events for your vue app.
- Built from scratch usign Vue 2 & Composition API with TypeScript
- For Vue >3.x version – `npm i v-offline@latest`
- For Vue >=2.7 version – `npm i v-offline@legacy`
- For Vue <2.7 version – `npm i v-offline@2.3.0`

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

[![Edit v-offline demo](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/v-offline?file=src/App.vue)

## Requirements

- [vue](https://vuejs.org/) `^3.x`

### Installation

```sh
npm install --save v-offline ping.js
```

CDN: [UNPKG](https://unpkg.com/v-offline/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-offline/dist/) (available as `window.VOffline`)

### Build Setup

```bash
# install dependencies
$ npm install

# package the library
$ npm run build
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

```html
<template>
  <v-offline
    online-class="online"
    offline-class="offline"
    @detected-condition="onNetworkChange"
  >
    <template v-if="online">
      <div class="flex w-full h-full justify-center items-center text-6xl">
        ⚡️
      </div>
    </template>
    <template v-if="!online">
      <div class="flex w-full h-full justify-center items-center text-6xl">
        💩
      </div>
    </template>
  </v-offline>
  <!-- Netlify Badge -->
  <div class="absolute bottom-4 right-4">
    <a
      href="https://app.netlify.com/sites/v-offline/deploys"
      aria-label="View deploys on Netlify"
      target="_blank"
      rel="noopener noreferrer"
      class="gray-400"
    >
      <img
        src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
        alt="Deploys by Netlify"
      />
    </a>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import type { Ref } from 'vue';
  import { VOffline } from 'v-offline';

  export default defineComponent({
    components: {
      VOffline,
    },
    setup() {
      const online: Ref<boolean> = ref(false);
      const onNetworkChange = (status: boolean) => {
        online.value = status;
      };
      return { online, onNetworkChange };
    },
  });
</script>
<style>
  @import 'v-github-icon/dist/v-github-icon.css';
</style>
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
