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
 *  CertCache.spec.js
 *
 *  Created by Mikk Õun on 16/01/2020.
 */

import getHmkit from './testutils/getHmkit';
import AccessCertificate from '../src/Core/AccessCertificate';
const hmkit = getHmkit();

const tempCache = JSON.parse(JSON.stringify(hmkit.certificates.certCache.getAccessCertificates()));

describe(`CertCache`, () => {
  afterAll(() => {
    hmkit.certificates.certCache.setGcTicks(2000).setCacheTTL(3600000);
    hmkit.certificates.certCache.setAccessCertificates(tempCache);
  });

  it(`should return empty object when cached cert does not exist`, () => {
    expect(() => {
      hmkit.certificates.certCache.destroy();
      hmkit.certificates.certCache.set(
        'app_id1',
        'vehicleSerial1',
        'accessToken1',
        'cert1'
      );
    }).not.toThrow();
  });
  it(`should clear cert cache correctly`, () => {
    hmkit.certificates.certCache.destroy();
    hmkit.certificates.certCache
      .setGcTicks(2)
      .setCacheTTL(0)
      .resetGcCounter();

    hmkit.certificates.certCache.setAccessCertificates(
      [
        {
          ai: 'appId1',
          vs: 'vehicleSerial1',
          at: 'accessToken1',
          c: 'cert1',
          t: Date.now() + 5000,
        },
        {
          ai: 'appId2',
          vs: 'vehicleSerial2',
          at: 'accessToken2',
          c: 'cert2',
          t: Date.now() - 5000,
        },
      ]
    );

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeInstanceOf(AccessCertificate);
    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeNull();
    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeNull();

    hmkit.certificates.certCache
      .setGcTicks(2)
      .setCacheTTL(0)
      .resetGcCounter();

    const time = Date.now() + 5000;

    hmkit.certificates.certCache.setAccessCertificates(
      [
        {
          ai: 'appId1',
          vs: 'vehicleSerial1',
          at: 'accessToken1',
          c: 'cert1',
          t: time,
        },
        {
          ai: 'appId2',
          vs: 'vehicleSerial2',
          at: 'accessToken2',
          c: 'cert2',
          t: time,
        },
      ]
    );

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeNull();

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeNull();

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeNull();
  });
});
