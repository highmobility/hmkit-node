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
 *  AccessCertificate.js
 *
 *  Created by Mikk Õun on 14/01/2020.
 */

import {
  base64ToUint8,
  uint8ArrayToHex,
  hexToInt,
  hexToUint8Array,
} from '../Utils/EncodingUtils';
import Permissions from './Permissions';

export default class AccessCertificate {
  constructor(data) {
    if (data instanceof AccessCertificate) {
      return data;
    } else if (data instanceof Uint8Array) {
      this.bytes = data;
      this.rawAccessCertificate = this.parse(data);
    } else if (data instanceof Object) {
      this.rawAccessCertificate = data;
    }

    this.version = this.getVersion();
    this.issuer = this.getIssuer();
    this.accessProvidingSerialNumber = this.getClientSerial();
    this.accessGainingSerialNumber = this.getVehicleSerial();
    this.accessGainingPublicKey = this.getVehiclePublicKey();
    this.validityStartDate = this.getValidityStartDate();
    this.validityEndDate = this.getValidityEndDate();
    this.permissions = this.rawAccessCertificate.permissions;
    this.signature = this.rawAccessCertificate.signature;
    this.accessCertificate = this.get();
  }

  parse(bytes: Uint8Array) {
    const unparsedBytes = [...bytes];

    const response = {
      version: uint8ArrayToHex(unparsedBytes.splice(0, 1)).toUpperCase(),
      issuer: uint8ArrayToHex(unparsedBytes.splice(0, 4)).toUpperCase(),
      accessProvidingSerialNumber: uint8ArrayToHex(
        unparsedBytes.splice(0, 9)
      ).toUpperCase(),
      accessGainingSerialNumber: uint8ArrayToHex(
        unparsedBytes.splice(0, 9)
      ).toUpperCase(),
      accessGainingPublicKey: uint8ArrayToHex(
        unparsedBytes.splice(0, 64)
      ).toUpperCase(),
      validityStartDate: uint8ArrayToHex(
        unparsedBytes.splice(0, 5)
      ).toUpperCase(),
      validityEndDate: uint8ArrayToHex(
        unparsedBytes.splice(0, 5)
      ).toUpperCase(),
    };

    const permissionsSize = uint8ArrayToHex(
      unparsedBytes.splice(0, 1)
    ).toUpperCase();
    const permissions = uint8ArrayToHex(
      unparsedBytes.splice(0, hexToInt(permissionsSize))
    ).toUpperCase();
    const signature = uint8ArrayToHex(
      unparsedBytes.splice(0, 64)
    ).toUpperCase();

    return {
      ...response,
      permissionsSize,
      permissions,
      signature,
    };
  }

  get() {
    return {
      version: this.version,
      issuer: this.issuer,
      accessProvidingSerialNumber: this.accessProvidingSerialNumber,
      accessGainingSerialNumber: this.accessGainingSerialNumber,
      accessGainingPublicKey: this.accessGainingPublicKey,
      validityStartDate: this.validityStartDate,
      validityEndDate: this.validityEndDate,
      permissions: this.permissions,
    };
  }

  getVersion() {
    return this.rawAccessCertificate.version;
  }

  getIssuer() {
    return this.rawAccessCertificate.issuer;
  }

  getSerial() {
    return this.rawAccessCertificate.accessGainingSerialNumber;
  }

  getVehicleSerial() {
    return this.rawAccessCertificate.accessGainingSerialNumber;
  }

  getVehiclePublicKey() {
    return this.rawAccessCertificate.accessGainingPublicKey;
  }

  getClientSerial() {
    return this.rawAccessCertificate.accessProvidingSerialNumber;
  }

  isDateValid(date: string) {
    const [year, month, day, hour, minute] = hexToUint8Array(date);

    if (year > 99) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (hour > 23) return false;
    if (minute > 59) return false;

    return true;
  }

  getValidityStartDate() {
    if (!this.isDateValid(this.rawAccessCertificate.validityStartDate)) {
      throw new Error('Start date is not valid.');
    }

    const [year, month, day, hour, minute] = hexToUint8Array(
      this.rawAccessCertificate.validityStartDate
    );

    return new Date(`20${year}`, month, day, hour, minute);
  }

  getValidityEndDate() {
    if (!this.isDateValid(this.rawAccessCertificate.validityEndDate)) {
      throw new Error('End date is not valid.');
    }

    const [year, month, day, hour, minute] = hexToUint8Array(
      this.rawAccessCertificate.validityEndDate
    );

    return new Date(`20${year}`, month, day, hour, minute);
  }

  getPermissions() {
    return new Permissions(
      base64ToUint8(this.rawAccessCertificate.permissions)
    );
  }
}
