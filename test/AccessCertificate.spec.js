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
 *  AccessCertificate.spec.js
 * 
 *  Created by Mikk Õun on 16/01/2020.
 */

import AccessCertificate from '../src/Core/AccessCertificate';
import Permissions from '../src/Core/Permissions';
import { base64ToUint8 } from '../src/Utils/EncodingUtils';

const accessCertificateBase64 = `AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6EgIHDAwSAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==`;
const accessCertificateBytes = base64ToUint8(accessCertificateBase64);

describe(`AccessCertificate`, () => {
  it(`should initialize`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    expect(accessCertificate).toBeInstanceOf(AccessCertificate);
  });

  it(`should return access certificate object`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);

    expect(accessCertificate.get()).toEqual(
      expect.objectContaining({
        version: expect.anything(),
        issuer: expect.anything(),
        accessProvidingSerialNumber: expect.anything(),
        accessGainingSerialNumber: expect.anything(),
        accessGainingPublicKey: expect.anything(),
        validityStartDate: expect.anything(),
        validityEndDate: expect.anything(),
        permissions: expect.anything(),
      })
    );
  });

  it(`should return correct vehicle serial number`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    expect(accessCertificate.getVehicleSerial()).toBe('13038240E6429AD779');
    expect(accessCertificate.getSerial()).toBe('13038240E6429AD779');
  });

  it(`should return correct vehicle public key`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    expect(accessCertificate.getVehiclePublicKey()).toBe(
      'A9B361696B6324EBEED5363C7B07FF4BD47AE687358F1AE5B04B610C037BF20A1657BC1EF133BF03572B621FE6034351ADDCC007AC598670E2232B752568A8BA'
    );
  });

  it(`should return correct client serial`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    expect(accessCertificate.getClientSerial()).toBe('E21531C5953E626088');
  });

  it(`should return correct validity start date`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    const startDate = accessCertificate.getValidityStartDate();
    expect(startDate).toBeInstanceOf(Date);

    // This is dependant on the "executor's" timeZone (i.e. fails, by 1 hour, if not run in EEST)
    expect(startDate.getTime()).toBe(1520417520000);
  });

  it(`should throw error on invalid date validation`, () => {
    const invalidYearCert = `AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6ZAIHDAwSAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==`;
    const invalidMonthCert = `AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6EjwHDAwSAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==`;
    const invalidDayCert = `AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6EgI8DAwSAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==`;
    const invalidHourCert = `AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6EgIHPAwSAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==`;
    const invalidMinCert = `AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6EgIHDDwSAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==`;

    expect(() => {
      const accessCertificate = new AccessCertificate(
        base64ToUint8(invalidYearCert)
      );
      console.log(accessCertificate.getValidityStartDate());
    }).toThrow();

    expect(() => {
      const accessCertificate = new AccessCertificate(
        base64ToUint8(invalidMonthCert)
      );
      console.log(accessCertificate.getValidityStartDate());
    }).toThrow();

    expect(() => {
      const accessCertificate = new AccessCertificate(
        base64ToUint8(invalidDayCert)
      );
      console.log(accessCertificate.getValidityStartDate());
    }).toThrow();

    expect(() => {
      const accessCertificate = new AccessCertificate(
        base64ToUint8(invalidHourCert)
      );
      console.log(accessCertificate.getValidityStartDate());
    }).toThrow();

    expect(() => {
      const accessCertificate = new AccessCertificate(
        base64ToUint8(invalidMinCert)
      );
      console.log(accessCertificate.getValidityStartDate());
    }).toThrow();
  });

  it(`should throw error on invalid start date`, () => {
    expect(() => {
      const accessCertificate = new AccessCertificate(
        base64ToUint8(
          `AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6ZQIHDAwSAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==`
        )
      );
      accessCertificate.getValidityStartDate();
    }).toThrow();
  });

  it(`should throw error on invalid end date`, () => {
    expect(() => {
      const accessCertificate = new AccessCertificate(
        base64ToUint8(
          `AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6EgIHDAxkAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==`
        )
      );
      accessCertificate.getValidityEndDate();
    }).toThrow();
  });

  it(`should return correct validity end date`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    const endDate = accessCertificate.getValidityEndDate();
    expect(endDate).toBeInstanceOf(Date);

    // This is dependant on the "executor's" timeZone (i.e. fails, by 1 hour, if not run in EEST)
    expect(endDate.getTime()).toBe(1523092320000);
  });

  it(`should return Permissions instance`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    const permissions = accessCertificate.getPermissions();
    expect(permissions).toBeInstanceOf(Permissions);
  });

  // it(`should throw invalid date errors`, () => {
  //   const getAccessCertificateInHex = (
  //     startDate = '11080B0C00',
  //     endDate = '11090B0C00'
  //   ) =>
  //     `356675D0CC76A8FFF50B2A2BD787476361298CA2E92D4004263806C10780D32CB7FEDB12BCA2C52927EB2BFE589C4BEB8718FD8020DBAE874173022827154873A9EFFF9EF51435A301C5FF53CB963F2DD256${startDate}${endDate}071007FFFDFFEFFF491A5AAC32B62E9BAEB5B32DD0D7055ABE9C5E44DD55D39E8BF0087AF0F2B59E92A16F82AAEE211DBEC16AA665CFD8D97E221369665A4B194041314782A3FF66`;
  //
  //   const startDateError = 'Start date is not valid.';
  //   expect(() => {
  //     // start date year > 99
  //     new AccessCertificate( // eslint-disable-line no-new
  //       hexToUint8Array(getAccessCertificateInHex('CC080B0C00', undefined))
  //     );
  //   }).toThrow(startDateError);
  //   expect(() => {
  //     // start date month < 1
  //     new AccessCertificate( // eslint-disable-line no-new
  //       hexToUint8Array(getAccessCertificateInHex('11000B0C00', undefined))
  //     );
  //   }).toThrow(startDateError);
  //   expect(() => {
  //     // start date month > 12
  //     new AccessCertificate( // eslint-disable-line no-new
  //       hexToUint8Array(getAccessCertificateInHex('110D0B0C00', undefined))
  //     );
  //   }).toThrow(startDateError);
  //   expect(() => {
  //     // start date day < 1
  //     new AccessCertificate( // eslint-disable-line no-new
  //       hexToUint8Array(getAccessCertificateInHex('1108000C00', undefined))
  //     );
  //   }).toThrow(startDateError);
  //   expect(() => {
  //     // start date day > 31
  //     new AccessCertificate( // eslint-disable-line no-new
  //       hexToUint8Array(getAccessCertificateInHex('1108200C00', undefined))
  //     );
  //   }).toThrow(startDateError);
  //   expect(() => {
  //     // start date hour > 23
  //     new AccessCertificate( // eslint-disable-line no-new
  //       hexToUint8Array(getAccessCertificateInHex('11080B1800', undefined))
  //     );
  //   }).toThrow(startDateError);
  //   expect(() => {
  //     // start date minute > 59
  //     new AccessCertificate( // eslint-disable-line no-new
  //       hexToUint8Array(getAccessCertificateInHex('11080B0C3C', undefined))
  //     );
  //   }).toThrow(startDateError);
  //
  //   const endDateError = 'End date is not valid.';
  //   expect(() => {
  //     // start date year > 99
  //     new AccessCertificate( // eslint-disable-line no-new
  //       hexToUint8Array(getAccessCertificateInHex(undefined, 'CC090B0C00'))
  //     );
  //   }).toThrow(endDateError);
  // });
});
