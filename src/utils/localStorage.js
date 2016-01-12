const storageFactory = (storage) => {
  return {
    get: (value) => {
      try {
        return JSON.parse((storage.getItem(value) || '{}'));
      } catch (e) {
        return storage.getItem(value);
      }
    },
    set: (key, value) => {
      let currentValue = value;
      if (typeof value !== 'string') {
        currentValue = JSON.stringify(value);
      }
      return storage.setItem(key, currentValue);
    },
    remove: (key) => {
      return storage.removeItem(key);
    },
  };
};

const localStorageService = storageFactory(window.localStorage);

module.exports = {
  set: localStorageService.set,
  get: localStorageService.get,
  remove: localStorageService.remove,
  session: storageFactory(window.sessionStorage),
};
