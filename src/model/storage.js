import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

// 初始化storage
createStorage = () => {
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
export default createStorage