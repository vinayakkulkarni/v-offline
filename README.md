# V-Offline :zap: <a href="http://npmjs.org/package/v-offline"><img src="https://img.shields.io/npm/v/v-offline.svg" alt="npm version"></a> <a href="https://bundlephobia.com/result?p=v-offline"><img src="http://img.badgesize.io/vinayakkulkarni/v-offline/master/dist/v-offline.min.js?compression=gzip" alt="gzip size"></a> <a href="https://travis-ci.org/vinayakkulkarni/v-offline"><img src="https://travis-ci.org/vinayakkulkarni/v-offline.svg?branch=master" alt="Build Status"></a> <a href="http://npm-stat.com/charts.html?package=v-offline"><img src="https://img.shields.io/npm/dm/v-offline.svg" alt="npm downloads"></a>

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

CDN: [UNPKG](https://unpkg.com/v-offline/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-offline/dist/) (available as `window.VOffline`)

## :white_check_mark: Usage :mortar_board:

Register the component globally:

```javascript
Vue.component('VOffline', require('v-offline'));
```

Or use locally

```javascript
import VOffline from 'v-offline';
```

## :white_check_mark: Example 1 :four_leaf_clover:

### HTML
```html
<v-offline
  online-class="online"
  offline-class="offline"
  @detected-condition="amIOnline">
  <template v-slot:[onlineSlot] :slot-name="onlineSlot">
    ( Online: {{ onLine }} )
  </template>
  <template v-slot:[offlineSlot] :slot-name="offlineSlot">
    ( Online: {{ onLine }} )
  </template>
</v-offline>
```

### JS
```javascript
import VOffline from 'v-offline';

Vue.component('example-component', {
  components: {
    VOffline
  },
  data: () => ({
    onLine: null,
    onlineSlot: 'online',
    offlineSlot: 'offline',
  }),
  methods: {
    amIOnline(e) {
      this.onLine = e;
    },
  },
});
```

### CSS
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

### :white_check_mark: :book: Props

| Name            | Type   | Required? | Default              | Description                                                 |
| --------------  | ------ | --------- | ---------            | ----------------------------------------------------------- |
| `slot-name`     | String | No        | 'online'             | The name of the slot, refer to the [v-slot docs](https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names)    |
| `online-class`  | String | No        | ''                   | Styling the `div` which you want to give if you're online.  |
| `offline-class` | String | No        | ''                   | Styling the `div` which you want to give if you're offline. |
| `ping-url`      | String | No        | https://google.com   | Pinging any url to double check if you're online or not.    |

### :white_check_mark: :ear: Events

| Name                 | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `detected-condition` | Emits an Boolean value which can be used for multiple purposes in your app. |

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**v-offline** © [Vinayak](https://github.com/vinayakkulkarni), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Vinayak Kulkarni with help from contributors ([list](https://github.com/vinayakkulkarni/v-offline/contributors)).

> GitHub [@vinayakkulkarni](https://github.com/vinayakkulkarni) · Twitter [@\_vinayak_k](https://twitter.com/_vinayak_k)
