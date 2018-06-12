import AccessCertificate from '../src/AccessCertificate';
import Permissions from '../src/Permissions';
import { base64ToUint8, hexToUint8Array } from '../src/encoding';

const accessCertificateBase64 =
  'AXRtY3PiFTHFlT5iYIgTA4JA5kKa13mps2Fpa2Mk6+7VNjx7B/9L1HrmhzWPGuWwS2EMA3vyChZXvB7xM78DVytiH+YDQ1Gt3MAHrFmGcOIjK3UlaKi6EgIHDAwSAwcMDAcQB//9/+//1jq+dn2onSRkXAoB68+K+9+pNTUtYxQbQFYShgyU7V+LFf5EyYg2C8KXnJ+qpcKL1fPSDd1xV/K9zUi04JhFAA==';
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
