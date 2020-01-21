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
 *  ClientCertificate.js
 * 
 *  Created by Mikk Õun on 14/01/2020.
 */

import { uint8ArrayToHex, bytesToString } from '../Utils/EncodingUtils';

export default class ClientCertificate {
  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.rawClientCertificate = this.parse(bytes);
    this.issuer = this.rawClientCertificate.issuer;
    this.appIdentifier = this.getAppId();
    this.clientSerial = this.getSerial();
    this.publicKey = this.rawClientCertificate.publicKey;
    this.signature = this.rawClientCertificate.signature;
    this.clientCertificate = this.get();
  }

  parse(bytes: Uint8Array) {
    return {
      issuer: bytesToString(bytes.slice(0, 4)),
      appIdentifier: uint8ArrayToHex(bytes.slice(4, 16)).toUpperCase(),
      clientSerial: uint8ArrayToHex(bytes.slice(16, 25)).toUpperCase(),
      publicKey: uint8ArrayToHex(bytes.slice(25, 89)).toUpperCase(),
      signature: uint8ArrayToHex(bytes.slice(89, 153)).toUpperCase(),
    };
  }

  get() {
    return {
      issuer: this.issuer,
      appIdentifier: this.appIdentifier,
      clientSerial: this.clientSerial,
      publicKey: this.publicKey,
    };
  }

  getSerial() {
    return this.rawClientCertificate.clientSerial;
  }

  getAppId() {
    return this.rawClientCertificate.appIdentifier;
  }
}
