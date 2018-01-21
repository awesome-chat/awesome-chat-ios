import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

// 初始化storage
export function createStorage() {
  if(!global.storage) {
    const storage = new Storage({
      size: 1000,
      defaultExpires: 1000 * 3600 * 24 * 7,
      enableCache: true,
      storageBackend: AsyncStorage,
    })
    global.storage = storage;
  }
}

export function initStorage() {
  storage.load({
    key: 'rooms',
  }).then(ret => {
    console.log(ret)
  }).catch(err => {
    storage.save({
      key: 'rooms',
      data: [],
    });
  })
}