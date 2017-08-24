import path from 'path';
import fs from 'fs';

export default class Storage {
  constructor(hmkit) {
    this.hmkit = hmkit;
    this.storageDirPath = path.resolve(__dirname, '..', 'storage');
  }

  get(storeName, key) {
    const store = this.getStore(storeName);

    return this.findFromStore(store, key);
  }

  add(storeName, key, value) {
    const store = this.getStore(storeName);

    const newStore = {
      ...store,
      [key]: value,
    };

    return this.put(storeName, newStore);
  }

  getStoreFilePath(storeName) {
    return path.resolve(this.storageDirPath, storeName) + '.json';
  }

  getStore(storeName) {
    const storePath = this.getStoreFilePath(storeName);

    if (!fs.existsSync(storePath)) {
      return {};
    }

    const storeContents = fs.readFileSync(storePath, 'utf8');
    if (!this.isJson(storeContents)) {
      throw new Error(`Invalid json in file "${storePath}"`);
    }

    return JSON.parse(storeContents);
  }

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  findFromStore(store, key) {
    return store[key] ? store[key] : null;
  }

  put(storeName, data) {
    const storePath = this.getStoreFilePath(storeName);
    fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
  }
}
