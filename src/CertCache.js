import path from 'path';
import fs from 'fs';

import AccessCertificate from './AccessCertificate';
import { base64ToUint8 } from './encoding';

const CACHE_STORE_NAME = 'access_certificates';
const CACHE_TTL = 3600000;
const GC_TICKS = 2000;

class CertCache {
  constructor() {
    this.cacheTTL = CACHE_TTL;
    this.GCTicks = GC_TICKS;
    this.GCCounter = 0;
    this.storePath = `${path.resolve(
      __dirname,
      '..',
      'storage',
      CACHE_STORE_NAME
    )}.json`;
  }

  get(appId) {
    const store = this.getStore();
    const existingItem = store[appId];

    if (!existingItem) return null;

    this.GCCounter++;

    this.setStore({
      ...store,
      [appId]: {
        ...existingItem,
        t: Date.now(),
      },
    });

    this.tryCacheGC();

    return new AccessCertificate(base64ToUint8(existingItem.c));
  }

  set(appId, base64Cert) {
    this.GCCounter++;

    const store = this.getStore();

    this.setStore({
      ...store,
      [appId]: {
        c: base64Cert,
        t: Date.now(),
      },
    });

    this.tryCacheGC();
  }

  tryCacheGC() {
    if (this.GCCounter >= this.GCTicks) {
      const currentTimestamp = Date.now();
      const newStore = Object.entries(this.getStore())
        .filter(([, { t }]) => t + this.cacheTTL > currentTimestamp)
        .reduce(
          (store, [key, value]) => ({
            ...store,
            [key]: value,
          }),
          {}
        );

      this.setStore(newStore);
      this.GCCounter = 0;
    }
  }

  getStore() {
    if (!fs.existsSync(this.storePath)) {
      return {};
    }

    const storeContents = fs.readFileSync(this.storePath, 'utf8');

    try {
      return JSON.parse(storeContents);
    } catch (e) {
      throw new Error(`Invalid json in file "${this.storePath}"`);
    }
  }

  setStore(data) {
    fs.writeFileSync(this.storePath, JSON.stringify(data, null, 2));
  }

  setRawStore(data) {
    fs.writeFileSync(this.storePath, data);
  }

  setCacheTTL(cacheTTL) {
    this.cacheTTL = cacheTTL;
    return this;
  }

  setGcTicks(GCTicks) {
    this.GCTicks = GCTicks;
    return this;
  }

  resetGcCounter() {
    this.GCCounter = 0;
    return this;
  }

  destroy() {
    if (!fs.existsSync(this.storePath)) return;
    fs.unlinkSync(this.storePath);
  }
}

export default new CertCache();
