declare var wx: any;

// https://github.com/Seb-L/pinia-plugin-persist

const MSG_NO_STORAGE = 'storage is required, please set it in app.$storage';

const PiniaPluginPersist = (inContext) => {
  const { app, store, options } = inContext;
  const { $storage, persist } = options;
  const storage = $storage || app.$storage;
  if (!storage) throw new Error(MSG_NO_STORAGE);
  if (!persist) return;

  const keys = persist.keys || [];
  const id = store.$id;

  store.$subscribe((mutation) => {
    const events = mutation.events;
    const targetEvents = Array.isArray(events) ? events : [events];
    const targets = targetEvents.filter((event) => keys.includes(event.key));
    targets.forEach((target) => {
      const storeKey = `${id}.${target.key}`;
      storage.set(storeKey, target.newValue);
    });
  });
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = PiniaPluginPersist;
}

export default PiniaPluginPersist;
