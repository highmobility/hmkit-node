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
 *  Container.js
 *
 *  Created by Mikk Õun on 20/01/2020.
 */

import hmcrypto from 'hmkit-crypto/src/HmKitCrypto';

import { uint8ArrayToHex } from '../Utils/EncodingUtils';

export default class Container {
  constructor(
    data: Uint8Array,
    senderPrivateKey: Uint8Array,
    targetPublicKey: Uint8Array,
    senderSerialNumber: Uint8Array,
    targetSerialNumber: Uint8Array,
    nonce: Uint8Array,
    requestId: Uint8Array = new Uint8Array([]),
    encryptedFlag = 1,
    contentType = 1
  ) {
    this.data = data;
    this.senderPrivateKey = senderPrivateKey;
    this.targetPublicKey = targetPublicKey;
    this.nonce = nonce;
    this.encryptedFlag = encryptedFlag;
    this.contentType = contentType;
    this.requestId = requestId;
    this.senderSerialNumber = senderSerialNumber;
    this.targetSerialNumber = targetSerialNumber;
  }

  static unpack = (
    orignialContainerBytes: Uint8Array,
    myPrivateKey: Uint8Array,
    othersPublicKey: Uint8Array
  ) => {
    if (orignialContainerBytes[0] !== 0x00) {
      throw new Error('InvalidFistByteOfContainer');
    }
    if (orignialContainerBytes[orignialContainerBytes.length - 1] !== 0xff) {
      throw new Error('InvalidLastByteOfContainer');
    }
    const containerBytes = Container.removeEscapeBytes(orignialContainerBytes);
    const unparsedBytes = [...containerBytes];
    unparsedBytes.splice(0, 2);

    const senderSerialNumber = Uint8Array.from(unparsedBytes.splice(0, 9));

    const targetSerialNumber = Uint8Array.from(unparsedBytes.splice(0, 9));

    const nonce = Uint8Array.from(unparsedBytes.splice(0, 9));

    const requestIdSize = parseInt(
      uint8ArrayToHex(unparsedBytes.splice(0, 2)),
      16
    );

    const requestId = Uint8Array.from(unparsedBytes.splice(0, requestIdSize));

    const encryptedFlag = unparsedBytes.splice(0, 1)[0];

    const contentType = unparsedBytes.splice(0, 1)[0];

    const dataSize = parseInt(uint8ArrayToHex(unparsedBytes.splice(0, 4)), 16);

    const data = Uint8Array.from(unparsedBytes.splice(0, dataSize));

    const hmac = Uint8Array.from(unparsedBytes.splice(0, 32));

    const container = new Container(
      data,
      myPrivateKey,
      othersPublicKey,
      senderSerialNumber,
      targetSerialNumber,
      nonce,
      requestId,
      encryptedFlag,
      contentType
    );
    const expectedHmac = Uint8Array.from(
      hmcrypto.hmac(container.sessionKey(), container.buildMessage(data))
    );

    if (expectedHmac.data !== hmac.data) {
      throw new Error('InvalidHMAC');
    }

    container.data = container.insideData(data);
    return container;
  };

  sessionKey = () =>
    hmcrypto.sessionKey(
      this.senderPrivateKey,
      this.targetPublicKey,
      this.nonce
    );

  pack = () => {
    const data = this.insideData(this.data);
    const message = this.buildMessage(data);
    const telematicsContainer = Uint8Array.from([
      ...message,
      ...hmcrypto.hmac(this.sessionKey(), message),
    ]);

    return Uint8Array.from([
      0x00,
      ...Container.escapeBytes(telematicsContainer),
      0xff,
    ]);
  };

  insideData = data => {
    if (this.encryptedFlag === 0) {
      return data;
    }

    return Uint8Array.from(
      hmcrypto.encryptDecrypt(
        data,
        this.senderPrivateKey,
        this.targetPublicKey,
        this.nonce
      )
    );
  };
  buildMessage = data =>
    Uint8Array.from([
      0x02,
      ...this.senderSerialNumber,
      ...this.targetSerialNumber,
      ...this.nonce,
      ...this.intToBytes(this.requestId.length, 2),
      ...this.requestId,
      ...this.intToBytes(this.encryptedFlag, 1),
      ...this.intToBytes(this.contentType, 1),
      ...this.intToBytes(data.length, 4),
      ...data,
    ]);

  intToBytes = (value, size) => {
    const buff = Buffer.alloc(size);
    buff.writeUIntBE(value, 0, size);
    return Uint8Array.from(buff);
  };

  static escapeBytes = data => {
    const result = [];
    let i = 0;
    for (i = 0; i < data.length; i++) {
      if (data[i] === 0x00 || data[i] === 0xfe || data[i] === 0xff) {
        result.push(0xfe);
        result.push(data[i]);
      } else {
        result.push(data[i]);
      }
    }
    return Uint8Array.from(result);
  };

  static removeEscapeBytes = data => {
    const result = [];
    let i = 0;
    for (i = 0; i < data.length; i++) {
      if (data[i] === 0xfe) {
        i++;
        result.push(data[i]);
      } else {
        result.push(data[i]);
      }
    }
    return Uint8Array.from(result);
  };
}
