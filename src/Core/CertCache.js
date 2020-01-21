/*
 *  The MIT License
 * 
 *  Copyright (c) 2014- High-Mobility GmbH (https://high-mobility.com)
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 * 
 *  CertCache.js
 * 
 *  Created by Mikk Õun on 14/01/2020.
 */

import path from 'path';
import fs from 'fs';

import AccessCertificate from './AccessCertificate';
import { base64ToUint8 } from '../Utils/EncodingUtils';

const CACHE_STORE_NAME = 'access_certificates';
const CACHE_TTL = 3600000;
const GC_TICKS = 2000;

class CertCache {
  constructor() {
    this.cacheTTL = CACHE_TTL;
    this.GCTicks = GC_TICKS;
    this.GCCounter = 0;
  }

  storePath() {
    if (process.env.HM_NODE_SDK_STORAGE_PATH) {
      return `${path.resolve(
        process.env.HM_NODE_SDK_STORAGE_PATH,
        CACHE_STORE_NAME
      )}.json`;
    }
    return `${path.resolve(
      __dirname,
      '..',
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
    if (!fs.existsSync(this.storePath())) {
      return [];
    }

    const storeContents = fs.readFileSync(this.storePath(), 'utf8');

    try {
      const store = JSON.parse(storeContents);
      return Array.isArray(store) ? store : [];
    } catch (e) {
      throw new Error(`Invalid json in file "${this.storePath()}"`);
    }
  }

  setStore(data) {
    fs.writeFileSync(this.storePath(), JSON.stringify(data, null, 2));
  }

  setRawStore(data) {
    fs.writeFileSync(this.storePath(), data);
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
    if (!fs.existsSync(this.storePath())) return;
    fs.unlinkSync(this.storePath());
  }
}

export default new CertCache();
