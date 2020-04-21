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

import AccessCertificate from './AccessCertificate';
import { base64ToUint8 } from '../Utils/EncodingUtils';

const CACHE_TTL = 3600000;
const GC_TICKS = 2000;

class CertCache {
  constructor() {
    this.cacheTTL = CACHE_TTL;
    this.GCTicks = GC_TICKS;
    this.GCCounter = 0;
    this.accessCertificates = [];
  }

  getByVehicleSerial(appId, vehicleSerial) {
    return this.get(({ ai, vs }) => ai === appId && vs === vehicleSerial);
  }

  getByAccessToken(appId, accessToken) {
    return this.get(({ ai, at }) => ai === appId && at === accessToken);
  }

  getAccessCertificates() {
    return this.accessCertificates;
  }

  get(filterFunction) {
    const existingItemIndex = this.accessCertificates.findIndex(filterFunction);

    if (existingItemIndex < 0) return null;

    const { c } = this.updateTimestamp(existingItemIndex);
    return new AccessCertificate(base64ToUint8(c));
  }

  updateTimestamp(index) {
    this.GCCounter++;

    const { ai, vs, at, c } = this.accessCertificates[index];
    const newAccessCertificates = [...this.accessCertificates];
    const newItem = this.createCacheObject(ai, vs, at, c);
    newAccessCertificates.splice(index, 1, newItem);

    this.accessCertificates = newAccessCertificates;
    this.tryCacheGC();

    return newItem;
  }

  set(appId, vehicleSerial, accessToken, base64Cert) {
    this.GCCounter++;

    this.accessCertificates = [
      ...this.accessCertificates,
      this.createCacheObject(appId, vehicleSerial, accessToken, base64Cert),
    ];

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
      this.accessCertificates = this.accessCertificates.filter(({ t }) => t + this.cacheTTL > currentTimestamp);
      this.GCCounter = 0;
    }
  }

  setCacheTTL(cacheTTL) {
    this.cacheTTL = cacheTTL;
    return this;
  }

  setGcTicks(GCTicks) {
    this.GCTicks = GCTicks;
    return this;
  }

  setAccessCertificates(accessCertificates) {
    this.accessCertificates = accessCertificates;
    return this;
  }

  resetGcCounter() {
    this.GCCounter = 0;
    return this;
  }

  destroy() {
    this.accessCertificates = [];
  }
}

const certCache = new CertCache();
export default certCache;
