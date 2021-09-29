# V-Offline ⚡️

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vinayakkulkarni/v-offline/ci?logo=github-actions)](https://github.com/vinayakkulkarni/v-offline/actions/workflows/ci.yml)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vinayakkulkarni/v-offline/Ship%20js%20trigger?label=⛴%20Ship.js%20trigger)](https://github.com/vinayakkulkarni/v-offline/actions/workflows/shipjs-trigger.yml)
[![npm](https://img.shields.io/npm/dm/v-offline?logo=npm)](http://npm-stat.com/charts.html?package=v-offline)
[![npm](https://img.shields.io/npm/v/v-offline/latest?logo=npm)](https://www.npmjs.com/package/v-offline)
[![npm bundle size (version)](https://img.shields.io/bundlephobia/min/v-offline/latest?label=@latest%20size&logo=vue.js)](https://bundlephobia.com/package/v-offline@latest)
[![npm](https://img.shields.io/npm/v/v-offline/next?logo=npm)](https://www.npmjs.com/package/v-offline)
[![npm bundle size (version)](https://img.shields.io/bundlephobia/min/v-offline/next?label=@next%20size&logo=vue.js)](https://bundlephobia.com/package/v-offline@next)
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
* Detect offline & online events for your vue app.
* Built from scratch usign Vue 2 & Composition API with TypeScript
* For Vue 3.x version – `npm i v-offline@3`

## Table of Contents

- [V-Offline ⚡️](#v-offline-️)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Requirements](#requirements)
    - [Installation](#installation)
    - [Build Setup](#build-setup)
  - [Usage](#usage)
    - [Globally](#globally)
      - [As a component](#as-a-component)
      - [As a plugin](#as-a-plugin)
    - [Locally](#locally)
      - [Example](#example)
  - [API](#api)
    - [Props](#props)
    - [Events](#events)
  - [Built with](#built-with)
  - [Contributing](#contributing)
  - [Author](#author)
  - [License](#license)

## Demo

[![Edit v-offline demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/v-offline-demo-8itb1?fontsize=14&hidenavigation=1&theme=dark)

## Requirements

* [vue](https://vuejs.org/) `^3.x`

### Installation

```sh
npm install --save v-offline
```

CDN: [UNPKG](https://unpkg.com/v-offline/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-offline/dist/) (available as `window.VOffline`)

### Build Setup

``` bash
# install dependencies
$ npm ci

# package the library
$ npm run build
```


## Usage

### Globally

#### As a component
```javascript
Vue.component('VOffline', require('v-offline'));
```

#### As a plugin

```javascript
import Vue from 'vue';
import VOffline from 'v-offline';

Vue.use(VOffline);
```

### Locally

```javascript
import { VOffline } from 'v-offline';
```

#### Example
<details>
<summary>Locally imported as a component</summary>
<br />

```html
<v-offline @detected-condition="amIOnline">
  <template v-if="online"> ( Online: {{ onLine }} ) </template>
  <template v-if="offline"> ( Online: {{ onLine }} ) </template>
</v-offline>
```

```javascript
import { VOffline } from 'v-offline';

Vue.component('example-component', {
  components: {
    VOffline
  },
  data() {
    return {
      onLine: true,
    };
  },
  methods: {
    amIOnline(e) {
      this.onLine = e;
    },
  },
});
```

```css
.offline {
  background-color: #fc9842;
  background-image: linear-gradient(315deg, #fc9842 0%, #fe5f75 74%);
}
.online {
  background-color: #00b712;
  background-image: linear-gradient(315deg, #00b712 0%, #5aff15 74%);
}
```
</details>


## API
### Props

| Name            | Type   | Required? | Default              | Description                                                 |
| --------------  | ------ | --------- | ---------            | ----------------------------------------------------------- |
| `online-class`  | String | No        | ''                   | Styling the `div` which you want to give if you're online.  |
| `offline-class` | String | No        | ''                   | Styling the `div` which you want to give if you're offline. |
| `ping-url`      | String | No        | https://google.com   | Pinging any url to double check if you're online or not.    |

### Events

| Name                  | Returns | Description            |
| ---                   | ---     | ---                    |
| `@detected-condition` | String  | Emits a boolean value  |

## Built with

- [TypeScript](https://www.typescriptlang.org/)
- [Vue 3](https://v3.vuejs.org)

## Contributing 

1. Fork it ( [https://github.com/vinayakkulkarni/v-offline/fork](https://github.com/vinayakkulkarni/v-offline/fork) )
2. Create your feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -Sam 'feat: add feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Create a new [Pull Request](https://github.com/vinayakkulkarni/v-offline/compare)

_Note_: 
1. Please contribute using [Github Flow](https://guides.github.com/introduction/flow/)
2. Commits & PRs will be allowed only if the commit messages & PR titles follow the [conventional commit standard](https://www.conventionalcommits.org/), _read more about it [here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)_
3. PS. Ensure your commits are signed. _[Read why](https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html)_


## Author

**v-offline** &copy; [Vinayak](https://vinayakkulkarni.dev), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Vinayak Kulkarni with help from contributors ([list](https://github.com/vinayakkulkarni/v-offline/contributors)).

> [vinayakkulkarni.dev](https://vinayakkulkarni.dev) · GitHub [@vinayakkulkarni](https://github.com/vinayakkulkarni) · Twitter [@\_vinayak_k](https://twitter.com/_vinayak_k)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-offline.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-offline?ref=badge_large)