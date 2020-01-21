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
 *  Container.spec.js
 * 
 *  Created by Mikk Õun on 20/01/2020.
 */

import Container from '../src/Core/Container';

import { base64ToUint8, hexToUint8Array } from '../src/Utils/EncodingUtils';

const senderSerialNumber = hexToUint8Array('AB0000000000000000');
const targetSerialNumber = hexToUint8Array('AB0000000000000001');

const nonce = hexToUint8Array('000102030405060708');

const privateKey = base64ToUint8(
  '9JFamPU0SF35y3c4TOt1frNwamZUQcUSD5dvOOu7xpw='
);

const publickKey = base64ToUint8(
  'npm0SD3UekJJLTS8nu5TBKUmcqDwjolao1UgGntXgs5hxdZIXu77up96IpwKUIyDVWjtamZwyaqk6AGdDC9SAQ=='
);

describe(`Container`, () => {
  it(`should pack the container`, () => {
    const data = new Uint8Array([0, 53, 1]);
    const container = new Container(
      data,
      privateKey,
      publickKey,
      senderSerialNumber,
      targetSerialNumber,
      nonce
    );
    const expectedEncryptedContainer = base64ToUint8(
      'AAKr/gD+AP4A/gD+AP4A/gD+AKv+AP4A/gD+AP4A/gD+AAH+AAECAwQFBgcI/gD+AAEB/gD+AP4AA4rBdmYJy/7/zcVFtvAN1phacOWxvE/42aZ/vB4kgyPxYoclgP8='
    );
    expect(container.pack()).toStrictEqual(expectedEncryptedContainer);
  });

  it(`should pack the container with optional request id`, () => {
    const data = new Uint8Array([0, 53, 1]);
    const container = new Container(
      data,
      privateKey,
      publickKey,
      senderSerialNumber,
      targetSerialNumber,
      nonce,
      new Uint8Array([0, 0, 0, 0, 0xff, 0xb])
    );
    const expectedEncryptedContainer = base64ToUint8(
      'AAKr/gD+AP4A/gD+AP4A/gD+AKv+AP4A/gD+AP4A/gD+AAH+AAECAwQFBgcI/gAG/gD+AP4A/gD+/wsBAf4A/gD+AAOKwXYTVPLogStAnW5FfOngHJRxrKaYZuw4wYYxApZPHAPng/8='
    );
    expect(container.pack()).toStrictEqual(expectedEncryptedContainer);
  });

  it(`should unpack the encrypted container`, () => {
    const encryptedContainer = base64ToUint8(
      'AAKr/gD+AP4A/gD+AP4A/gD+AKv+AP4A/gD+AP4A/gD+AAH+AAECAwQFBgcI/gD+AAEB/gD+AP4AA4rBdmYJy/7/zcVFtvAN1phacOWxvE/42aZ/vB4kgyPxYoclgP8='
    );
    const container = Container.unpack(
      encryptedContainer,
      privateKey,
      publickKey
    );
    expect(container.data).toStrictEqual(new Uint8Array([0, 53, 1]));
  });

  it(`should unpack the encrypted container with optinal request id`, () => {
    const encryptedContainer = base64ToUint8(
      'AAKr/gD+AP4A/gD+AP4A/gD+AKv+AP4A/gD+AP4A/gD+AAH+AAECAwQFBgcI/gAG/gD+AP4A/gD+/wsBAf4A/gD+AAOKwXYTVPLogStAnW5FfOngHJRxrKaYZuw4wYYxApZPHAPng/8='
    );
    const container = Container.unpack(
      encryptedContainer,
      privateKey,
      publickKey
    );
    expect(container.data).toStrictEqual(new Uint8Array([0, 53, 1]));
    expect(container.requestId).toStrictEqual(
      new Uint8Array([0, 0, 0, 0, 255, 11])
    );
  });

  it(`should remove escape bytes`, () => {
    const expectedBytes = hexToUint8Array(
      '000217ADD920644AA1413E3597100F3D43B9014C8642484F3243241C4B0000010000000016FE325771E5B6B609C7D451266BA04A65F45DF70B69463E1F99EE1AED6B78AD3417A7BF10C3B78F0662953B7A871B309A2931FDB11376FF'
    );
    const data = hexToUint8Array(
      '000217ADD920644AA1413E3597100F3D43B9014C8642484F3243241C4BFE00FE0001FE00FE00FE00FE0016FEFE325771E5B6B609C7D451266BA04A65F45DF70B69463E1F99EE1AED6B78AD3417A7BF10C3B78F0662953B7A871B309A2931FDB11376FF'
    );
    const bytes = Container.removeEscapeBytes(data);

    expect(bytes).toStrictEqual(expectedBytes);
  });
});
