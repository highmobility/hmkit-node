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

  getByVehicleSerial(appId, vehicleSerial) {
    return this.get(({ ai, vs }) => ai === appId && vs === vehicleSerial);
  }

  getByAccessToken(appId, accessToken) {
    return this.get(({ ai, at }) => ai === appId && at === accessToken);
  }

  get(filterFunction) {
    const store = this.getStore();
    const existingItemIndex = store.findIndex(filterFunction);

    if (existingItemIndex < 0) return null;

    const { c } = this.updateTimestamp(store, existingItemIndex);
    return new AccessCertificate(base64ToUint8(c));
  }

  updateTimestamp(store, index) {
    this.GCCounter++;

    const { ai, vs, at, c } = store[index];
    const newStore = [...store];
    const newItem = this.createCacheObject(ai, vs, at, c);
    newStore.splice(index, 1, newItem);

    this.setStore(newStore);
    this.tryCacheGC();

    return newItem;
  }

  set(appId, vehicleSerial, accessToken, base64Cert) {
    this.GCCounter++;

    const store = this.getStore();

    this.setStore([
      ...store,
      this.createCacheObject(appId, vehicleSerial, accessToken, base64Cert),
    ]);

    this.tryCacheGC();
  }

  createCacheObject(appId, vehicleSerial, accessToken, base64Cert) {
    return {
      ai: appId,
      vs: vehicleSerial,
      at: accessToken,
      c: base64Cert,
      t: Date.now(),
    };
  }

  tryCacheGC() {
    if (this.GCCounter >= this.GCTicks) {
      const currentTimestamp = Date.now();

      this.setStore(
        this.getStore().filter(({ t }) => t + this.cacheTTL > currentTimestamp)
      );
      this.GCCounter = 0;
    }
  }

  getStore() {
    if (!fs.existsSync(this.storePath)) {
      return [];
    }

    const storeContents = fs.readFileSync(this.storePath, 'utf8');

    try {
      const store = JSON.parse(storeContents);
      return Array.isArray(store) ? store : [];
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
