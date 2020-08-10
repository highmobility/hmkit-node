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
 *  Telematics.js
 *
 *  Created by Mikk Õun on 16/01/2020.
 */

import Response from '../Responses/Response';
import {
  base64ToUint8,
  byteArrayToBase64,
  uint8ArrayToHex,
  hexToUint8Array,
} from '../Utils/EncodingUtils';
import Container from './Container';
import AccessCertificate from './AccessCertificate';

export default class Telematics {
  constructor(hmkit) {
    this.hmkit = hmkit;
  }

  getNonce = () =>
    this.hmkit.apiClient
      .post(`${this.hmkit.api.getUrl()}nonces`, {
        body: JSON.stringify({
          serial_number: this.hmkit.clientCertificate.getSerial(),
        }),
      })
      .then(
        result => result.body.nonce,
        () => {
          throw new Error('Failed to fetch nonce.');
        }
      );

  onTelematicsSendData = async (issuer, ser, dt) => {
    const res = await this.hmkit.apiClient.post(`${this.hmkit.api.getUrl()}telematics_commands`, {
      body: JSON.stringify({
        serial_number: uint8ArrayToHex(new Uint8Array(ser)).toUpperCase(),
        issuer: uint8ArrayToHex(new Uint8Array(issuer)).toUpperCase(),
        data: byteArrayToBase64(dt),
      }),
    });

    return res.body.response_data;
  }

  sendCommand = async (data, accessCertificateData) => {
    const accessCertificate = new AccessCertificate(accessCertificateData);
    const nonce = await this.getNonce(accessCertificate.getVehicleSerial());

    const request = new Container(
      Uint8Array.from(data.command),
      base64ToUint8(this.hmkit.clientPrivateKey),
      hexToUint8Array(accessCertificate.getVehiclePublicKey()),
      hexToUint8Array(accessCertificate.getClientSerial()),
      hexToUint8Array(accessCertificate.getVehicleSerial()),
      base64ToUint8(nonce)
    );

    const result = await this.onTelematicsSendData(
      hexToUint8Array(accessCertificate.getIssuer()),
      hexToUint8Array(accessCertificate.getVehicleSerial()),
      request.pack()
    );

    // TODO:
    // 1. Handle none 200 response
    // 2. parse  Error container
    const response = Container.unpack(
      base64ToUint8(result),
      base64ToUint8(this.hmkit.clientPrivateKey),
      hexToUint8Array(accessCertificate.getVehiclePublicKey())
    );

    return new Response(response.data);
  };
}
