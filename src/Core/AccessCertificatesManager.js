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
 *  AccessCertificatesManager.js
 *
 *  Created by Mikk Õun on 14/01/2020.
 */

import AccessCertificate from './AccessCertificate';
import CertCache from './CertCache';
import {
  base64ToUint8,
  byteArrayToBase64,
  hexToUint8Array,
} from '../Utils/EncodingUtils';
import hmcrypto from 'hmkit-crypto/src/HmKitCrypto';

export default class AccessCertificatesManager {
  constructor(hmkit) {
    this.hmkit = hmkit;
    this.certCache = CertCache;
    this.accessCertificates = [];
  }

  get(vehicleSerial) {
    const { appIdentifier } = this.hmkit.clientCertificate;
    const existingCert = this.find(appIdentifier, vehicleSerial, null);

    if (!!existingCert) return existingCert;

    const certFromCache = this.certCache.getByVehicleSerial(
      appIdentifier,
      vehicleSerial
    );

    return this.addCert(vehicleSerial, appIdentifier, null, certFromCache);
  }

  find(appIdentifier, vehicleSerial, accessToken) {
    const accessCertificate = this.accessCertificates.find(
      accessCert =>
        accessCert.appIdentifier === appIdentifier &&
        ((!!accessCert.vehicleSerial &&
          accessCert.vehicleSerial === vehicleSerial) ||
          (!!accessCert.accessToken && accessCert.accessToken === accessToken))
    );

    return !!accessCertificate ? accessCertificate.cert : null;
  }

  addCert(vehicleSerial, appIdentifier, accessToken, cert) {
    this.accessCertificates.push({
      vehicleSerial,
      appIdentifier,
      accessToken,
      cert,
    });

    return cert;
  }

  download = async accessToken => {
    const { appIdentifier } = this.hmkit.clientCertificate;
    const existingCert = this.find(appIdentifier, null, accessToken);

    if (!!existingCert) return existingCert;

    const certFromCache = this.certCache.getByAccessToken(
      appIdentifier,
      accessToken
    );

    if (!!certFromCache) {
      return this.addCert(
        certFromCache.getSerial(),
        appIdentifier,
        accessToken,
        certFromCache
      );
    }

    const byteSignature = hmcrypto.sign(
      Buffer.from(accessToken),
      Buffer.from(base64ToUint8(this.hmkit.clientPrivateKey)),
      Buffer.from(hexToUint8Array(this.hmkit.clientCertificate.publicKey))
    );

    const signature = byteArrayToBase64(byteSignature);

    const rawAccessCertificate = await this.hmkit.apiClient
      .post(`${this.hmkit.api.getUrl()}access_certificates`, {
        body: JSON.stringify({
          serial_number: this.hmkit.clientCertificate.getSerial(),
          access_token: accessToken,
          signature,
        }),
      })
      .then(
        result => result.body.device_access_certificate,
        () => {
          throw new Error('Failed to fetch access certificate.');
        }
      );

    const accessCertificate = new AccessCertificate(
      base64ToUint8(rawAccessCertificate)
    );

    this.certCache.set(
      appIdentifier,
      accessCertificate.getSerial(),
      accessToken,
      rawAccessCertificate
    );

    return this.addCert(
      accessCertificate.getSerial(),
      appIdentifier,
      accessToken,
      accessCertificate
    );
  };
}
