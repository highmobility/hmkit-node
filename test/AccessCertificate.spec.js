import AccessCertificate from '../src/AccessCertificate';
import Permissions from '../src/Permissions';
import { base64ToUint8, hexToUint8Array } from '../src/encoding';

const accessCertificateBase64 =
  'NWZ10Mx2qP/1Cyor14dHY2EpjKLpLUAEJjgGwQeA0yy3/tsSvKLFKSfrK/5YnEvrhxj9gCDbrodBcwIoJxVIc6nv/571FDWjAcX/U8uWPy3SVhEICwwAEQkLDAAHEAf//f/v/0kaWqwyti6brrWzLdDXBVq+nF5E3VXTnovwCHrw8rWekqFvgqruIR2+wWqmZc/Y2X4iE2lmWksZQEExR4Kj/2Y=';
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
        accessGainingSerialNumber: expect.anything(),
        accessGainingPublicKey: expect.anything(),
        accessProvidingSerialNumber: expect.anything(),
        validityStartDate: expect.anything(),
        validityEndDate: expect.anything(),
        permissions: expect.anything(),
      })
    );
  });

  it(`should return correct vehicle serial number`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    expect(accessCertificate.getVehicleSerial()).toBe('356675D0CC76A8FFF5');
  });

  it(`should return correct vehicle public key`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    expect(accessCertificate.getVehiclePublicKey()).toBe(
      '0B2A2BD787476361298CA2E92D4004263806C10780D32CB7FEDB12BCA2C52927EB2BFE589C4BEB8718FD8020DBAE874173022827154873A9EFFF9EF51435A301'
    );
  });

  it(`should return correct client serial`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    expect(accessCertificate.getClientSerial()).toBe('C5FF53CB963F2DD256');
  });

  it(`should return correct validity start date`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    const startDate = accessCertificate.getValidityStartDate();
    expect(startDate).toBeInstanceOf(Date);
    expect(startDate.getTime()).toBe(1505120400000);
  });

  it(`should return correct validity end date`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    const endDate = accessCertificate.getValidityEndDate();
    expect(endDate).toBeInstanceOf(Date);
    expect(endDate.getTime()).toBe(1507712400000);
  });

  it(`should return Permissions instance`, () => {
    const accessCertificate = new AccessCertificate(accessCertificateBytes);
    const permissions = accessCertificate.getPermissions();
    expect(permissions).toBeInstanceOf(Permissions);
  });

  it(`should throw invalid date errors`, () => {
    const getAccessCertificateInHex = (
      startDate = '11080B0C00',
      endDate = '11090B0C00'
    ) =>
      `356675D0CC76A8FFF50B2A2BD787476361298CA2E92D4004263806C10780D32CB7FEDB12BCA2C52927EB2BFE589C4BEB8718FD8020DBAE874173022827154873A9EFFF9EF51435A301C5FF53CB963F2DD256${startDate}${endDate}071007FFFDFFEFFF491A5AAC32B62E9BAEB5B32DD0D7055ABE9C5E44DD55D39E8BF0087AF0F2B59E92A16F82AAEE211DBEC16AA665CFD8D97E221369665A4B194041314782A3FF66`;

    const startDateError = 'Start date is not valid.';
    expect(() => {
      // start date year > 99
      new AccessCertificate( // eslint-disable-line no-new
        hexToUint8Array(getAccessCertificateInHex('CC080B0C00', undefined))
      );
    }).toThrow(startDateError);
    expect(() => {
      // start date month < 1
      new AccessCertificate( // eslint-disable-line no-new
        hexToUint8Array(getAccessCertificateInHex('11000B0C00', undefined))
      );
    }).toThrow(startDateError);
    expect(() => {
      // start date month > 12
      new AccessCertificate( // eslint-disable-line no-new
        hexToUint8Array(getAccessCertificateInHex('110D0B0C00', undefined))
      );
    }).toThrow(startDateError);
    expect(() => {
      // start date day < 1
      new AccessCertificate( // eslint-disable-line no-new
        hexToUint8Array(getAccessCertificateInHex('1108000C00', undefined))
      );
    }).toThrow(startDateError);
    expect(() => {
      // start date day > 31
      new AccessCertificate( // eslint-disable-line no-new
        hexToUint8Array(getAccessCertificateInHex('1108200C00', undefined))
      );
    }).toThrow(startDateError);
    expect(() => {
      // start date hour > 23
      new AccessCertificate( // eslint-disable-line no-new
        hexToUint8Array(getAccessCertificateInHex('11080B1800', undefined))
      );
    }).toThrow(startDateError);
    expect(() => {
      // start date minute > 59
      new AccessCertificate( // eslint-disable-line no-new
        hexToUint8Array(getAccessCertificateInHex('11080B0C3C', undefined))
      );
    }).toThrow(startDateError);

    const endDateError = 'End date is not valid.';
    expect(() => {
      // start date year > 99
      new AccessCertificate( // eslint-disable-line no-new
        hexToUint8Array(getAccessCertificateInHex(undefined, 'CC090B0C00'))
      );
    }).toThrow(endDateError);
  });
});
