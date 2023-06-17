import nx from '@jswork/next';

declare var wx: any;

// https://github.com/Seb-L/pinia-plugin-persist

const MSG_NO_STORAGE = 'storage is required, please set it in app.$storage';

const PiniaPluginPersist = (inContext) => {
  const { app, store, options } = inContext;
  const { $storage, persist } = options;
  const storage = $storage || app.$storage;

  // pre check
  if (!persist || persist.disabled) return;
  if (!storage) throw new Error(MSG_NO_STORAGE);

  const keys = persist.keys || [];
  const id = store.$id;

  // init
  if (!persist.skipInit) {
    keys.forEach((key) => {
      const cacheKey = `${id}.${key}`;
      const value = storage.get(cacheKey);
      if (value) store.$patch({ [key]: value });
    });
  }

  store.$subscribe((mutation) => {
    const events = mutation.events || [];
    const targetEvents = Array.isArray(events) ? events : [events];
    const targets = targetEvents.filter((event) => keys.includes(event.key));
    targets.forEach((target) => {
      const storeKey = `${id}.${target.key}`;
      const value = target.newValue;
      storage.set(storeKey, value);
      if (persist.omitnil) {
        if (value === null || value === undefined) {
          const cache = storage.get(id);
          nx.del(cache, target.key);
          storage.set(id, cache);
        }
      }
    });
  });
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = PiniaPluginPersist;
}

export default PiniaPluginPersist;
