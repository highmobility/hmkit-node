import AccessCertificate from '../src/AccessCertificate';
import Permissions from '../src/Permissions';
import { base64ToUint8 } from '../src/encoding';

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
});
