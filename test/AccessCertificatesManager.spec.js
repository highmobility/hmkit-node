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
 *  AccessCertificatesManager.spec.js
 *
 *  Created by Mikk Õun on 16/01/2020.
 */

import AccessCertificate from '../src/Core/AccessCertificate';

import getHmkit, { accessToken } from './testutils/getHmkit';
import { vehicleSerial } from './testutils/config';

const accessCertificateBase64 =
  'AXh2c2KauTVDDuqgOfc7e6qsNPf81hjgrEObbnDmjE2/4qktAm4n7lL+npIP+ZAQnAUU/rPpCYL0ZFtwhwk4I1ETJPE2h1nZ9lazoUc9+LCqSB0pTeN0FwIVEgwXAhUSDAEAtUI8s45OiaCZJkFLiHUj3t4VicGL48XzfhuNwDp+McA1DrUh+q99d4xDjOk3ksb9qhKdJj3uMIVPJKnBst8dVQ==';
const hmkit = getHmkit();
const tempCache = JSON.parse(
  JSON.stringify(hmkit.certificates.certCache.getAccessCertificates())
);

describe(`AccessCertificatesManager`, () => {
  let apiClientPostSpy;

  beforeEach(() => {
    apiClientPostSpy = jest.spyOn(hmkit.apiClient, 'post');
  });

  afterEach(() => {
    apiClientPostSpy.mockRestore();
  });

  afterAll(() => {
    hmkit.certificates.certCache.setAccessCertificates(tempCache);
  });

  it(`should return null if no matching access certificate found`, () => {
    hmkit.certificates.certCache.destroy();
    const accessCertificate = hmkit.certificates.get();
    expect(accessCertificate).toBe(null);
  });

  it(`should throw error on failed access certification download`, async () => {
    apiClientPostSpy.mockRejectedValueOnce(new Error('Something went wrong!'));

    expect(
      hmkit.downloadAccessCertificate('pleaseFailInstantly')
    ).rejects.toEqual(new Error('Failed to fetch access certificate.'));
  });

  it(`should download cert if cert is not cached already`, async () => {
    apiClientPostSpy.mockResolvedValue({
      body: {
        device_access_certificate: accessCertificateBase64,
      },
    });

    hmkit.certificates.certCache.destroy();

    const accessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );

    expect(accessCertificate).toBeInstanceOf(AccessCertificate);
    const sameAccessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );

    expect(sameAccessCertificate).toBeInstanceOf(AccessCertificate);
    expect(sameAccessCertificate).toEqual(accessCertificate);
  });

  it(`should take cert from cache if it does not have one attached to it`, async () => {
    apiClientPostSpy.mockResolvedValue({
      body: {
        device_access_certificate: accessCertificateBase64,
      },
    });

    hmkit.certificates.certCache.destroy();
    hmkit.certificates.accessCertificates = [];

    await hmkit.downloadAccessCertificate(accessToken);

    expect(hmkit.certificates.get(vehicleSerial)).toBeInstanceOf(
      AccessCertificate
    );

    hmkit.certificates.accessCertificates = [];
    await hmkit.downloadAccessCertificate(accessToken);
    expect(hmkit.certificates.get(vehicleSerial)).toBeInstanceOf(
      AccessCertificate
    );

    hmkit.certificates.accessCertificates = [];
    hmkit.certificates.certCache.destroy();
    expect(hmkit.certificates.get(vehicleSerial)).toBeNull();
  });

  it(`should download access certificate`, async () => {
    apiClientPostSpy.mockResolvedValue({
      body: {
        device_access_certificate: accessCertificateBase64,
      },
    });

    const accessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );

    expect(accessCertificate).toBeInstanceOf(AccessCertificate);
  });
});
