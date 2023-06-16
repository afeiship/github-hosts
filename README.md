# pinia-plugin-persist
> Persist pinia state data storages.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/pinia-plugin-persist
```

## usage
```js
import PiniaPluginPersist from '@jswork/pinia-plugin-persist';

// ======== main.js  ======
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  // Attach storage
  app.$storage = nx.$storage;
  pinia.use(PiniaPluginPersist);
  //...
}

// ======== stores/auth.js ======
import { defineStore } from "pinia";

export default defineStore("auth", {
  state: () => ({ profile: null, user: null, other: null }),
  persist: {
    keys: ["profile", "user"]
  },
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/pinia-plugin-persist/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/pinia-plugin-persist
[version-url]: https://npmjs.org/package/@jswork/pinia-plugin-persist

[license-image]: https://img.shields.io/npm/l/@jswork/pinia-plugin-persist
[license-url]: https://github.com/afeiship/pinia-plugin-persist/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/pinia-plugin-persist
[size-url]: https://github.com/afeiship/pinia-plugin-persist/blob/master/dist/pinia-plugin-persist.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/pinia-plugin-persist
[download-url]: https://www.npmjs.com/package/@jswork/pinia-plugin-persist
