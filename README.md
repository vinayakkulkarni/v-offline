# V-Offline :zap: <a href="https://github.com/vinayakkulkarni/v-offline/releases/latest"><img src="https://img.shields.io/github/release/vinayakkulkarni/v-offline.svg" alt="github release"></a> <a href="http://npmjs.org/package/v-offline"><img src="https://img.shields.io/npm/v/v-offline.svg" alt="npm version"></a> <a href="https://travis-ci.org/vinayakkulkarni/v-offline"><img src="https://travis-ci.org/vinayakkulkarni/v-offline.svg?branch=master" alt="Build Status"></a> <a href="http://npm-stat.com/charts.html?package=v-offline"><img src="https://img.shields.io/npm/dm/v-offline.svg" alt="npm downloads"></a>

* Detect offline & online events for your vue app.

* This is [on GitHub](https://github.com/vinayakkulkarni/v-offline) so let me know if I've b0rked it somewhere, give me a star :star: if you like it :beers:

* Demo here -> [💯 Webpackbin Link](https://goo.gl/Pq6Tky)

## Requirements

* [Vue.js](https://vuejs.org/) 2.x

## :white_check_mark: Install :ok_hand:

```bash
npm install v-offline
# or
yarn add v-offline
```

CDN: [UNPKG](https://unpkg.com/v-offline/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-offline/dist/)

## :white_check_mark: Usage :mortar_board:

Register the component globally:

```javascript
Vue.component('detectNetwork', require('v-offline'));
```

Or use locally

```javascript
import detectNetwork from 'v-offline';
```

## :white_check_mark: Example 1 :four_leaf_clover:

```html
<detect-network v-on:detected-condition="detected">
  <div slot="online">Your Online Content!</div>
  <div slot="offline">Your Offline Content!</div>
</detect-network>
```

```javascript
Vue.component('example-component', {
  data() {
    return {
      state: null,
    };
  },
  methods: {
    detected(e) {
      this.state = e;
    },
  },
});
```

## :white_check_mark: Example 2 :four_leaf_clover:

```html
<detect-network>
  <div slot="online">Your Online Content!</div>
  <div slot="offline">Your Offline Content!</div>
</detect-network>
```

### :white_check_mark: :book: Props

| Name           | Type   | Required? | Description                                                 |
| -------------- | ------ | --------- | ----------------------------------------------------------- |
| `onlineClass`  | String | No        | Styling the `div` which you want to give if you're online.  |
| `offlineClass` | String | No        | Styling the `div` which you want to give if you're offline. |

### :white_check_mark: :ear: Events

| Name                 | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `detected-condition` | Emits an Boolean value which can be used for multiple purposes in your app. |

## NPM :octocat:

[![NPM](https://nodei.co/npm/v-offline.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/v-offline/)
