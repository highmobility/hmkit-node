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
 *  ClientCertificate.spec.js
 * 
 *  Created by Mikk Õun on 16/01/2020.
 */

import ClientCertificate from '../src/Core/ClientCertificate';
import { base64ToUint8 } from '../src/Utils/EncodingUtils';

const clientCertificateBase64 =
  'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5';
const clientCertificateBytes = base64ToUint8(clientCertificateBase64);

describe(`ClientCertificate`, () => {
  it(`should initialize`, () => {
    const clientCertificate = new ClientCertificate(clientCertificateBytes);
    expect(clientCertificate).toBeInstanceOf(ClientCertificate);
  });

  it(`should return client certificate object`, () => {
    const clientCertificate = new ClientCertificate(clientCertificateBytes);

    expect(clientCertificate.get()).toEqual(
      expect.objectContaining({
        issuer: expect.anything(),
        appIdentifier: expect.anything(),
        clientSerial: expect.anything(),
        publicKey: expect.anything(),
      })
    );
  });

  it(`should return correct client serial`, () => {
    const clientCertificate = new ClientCertificate(clientCertificateBytes);
    expect(clientCertificate.getSerial()).toBe('C5FF53CB963F2DD256');
  });

  it(`should return correct app identifier`, () => {
    const clientCertificate = new ClientCertificate(clientCertificateBytes);
    expect(clientCertificate.getAppId()).toBe('F67FA1861680AAC916118E09');
  });
});
