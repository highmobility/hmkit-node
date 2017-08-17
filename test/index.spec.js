import hmkit from 'test/testutils/getHmkit';
import HMKit from 'src/HMKit';

describe(`sdk`, () => {
  it(`should have a default export`, () => {
    expect(hmkit).toBeInstanceOf(HMKit);
  });

  it(`should parse access certificate`, () => {
    const accessCertificate = hmkit.parseAccessCertificate(
      'NWZ10Mx2qP/1Cyor14dHY2EpjKLpLUAEJjgGwQeA0yy3/tsSvKLFKSfrK/5YnEvrhxj9gCDbrodBcwIoJxVIc6nv/571FDWjAcX/U8uWPy3SVhEICwwAEQkLDAAHEAf//f/v/0kaWqwyti6brrWzLdDXBVq+nF5E3VXTnovwCHrw8rWekqFvgqruIR2+wWqmZc/Y2X4iE2lmWksZQEExR4Kj/2Y='
    );
    expect(accessCertificate.accessGainingSerialNumber).toMatch('356675D0CC76A8FFF5');
    expect(accessCertificate.accessGainingPublicKey).toMatch('B2A2BD787476361298CA2E92D40426386C1780D32CB7FEDB12BCA2C52927EB2BFE589C4BEB8718FD8020DBAE87417322827154873A9EFFF9EF51435A31');
    expect(accessCertificate.accessProvidingSerialNumber).toMatch('C5FF53CB963F2DD256');
    expect(accessCertificate.validityStartDate).toMatch('118BC0');
    expect(accessCertificate.validityEndDate).toMatch('119BC0');
    expect(accessCertificate.permissionsSize).toMatch('7');
    expect(accessCertificate.permissions).toMatch('107FFFDFFEFFF');
    expect(accessCertificate.signature).toMatch('491A5AAC32B62E9BAEB5B32DD0D755ABE9C5E44DD55D39E8BF087AF0F2B59E92A16F82AAEE211DBEC16AA665CFD8D97E221369665A4B194041314782A3FF66');
  });

  it(`should parse device certificate`, () => {
    const deviceCertificate = hmkit.parseDeviceCertificate(
      'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5'
    );
    expect(deviceCertificate.issuer).toMatch('74657374');
    expect(deviceCertificate.appIdentifier).toMatch('F67FA1861680AAC916118E9');
    expect(deviceCertificate.deviceSerial).toMatch('C5FF53CB963F2DD256');
    expect(deviceCertificate.publicKey).toMatch('1D5D558F2BDEF6F4C852E2F2403576E2AFCAC2FA6BA6A6DC34F3D677DCC74FB8519053D2DEE74F6999E01C9EA8AA3ABAE7551C2FA8FB8B5D5152E28C5901C');
    expect(deviceCertificate.signature).toMatch('ACE96962652AB0558ECA3AEE525D2058D4F53CA2985124A9BB5FEAF6EAAB299AC2FD52E3765BA51A8C82C48A5153B22D33B15DC36AC931D39512211E745F9');
  });

  it(`should send telematics command`, () => {
    hmkit.sendTelematicsCommand('356675D0CC76A8FFF5', []);
  });
});

