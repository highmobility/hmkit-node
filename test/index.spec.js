import getHmkit from 'test/testutils/getHmkit';
const hmkit = getHmkit();
import { uint8ArrayToHex, hexToUint8Array } from 'src/encoding';
import Capabilities from 'src/Commands/Capabilities';
import VehicleStatus from 'src/Commands/VehicleStatus';

describe(`sdk`, () => {
  it(`should do nothing`, () => {
    expect(1).toBe(1);
  });
  it(`should convert uint to hex and back to uint`, () => {
    const data = new Uint8Array([
      11,
      42,
      43,
      215,
      135,
      71,
      99,
      97,
      41,
      140,
      162,
      233,
      45,
      64,
      4,
      38,
      56,
      6,
      193,
      7,
      128,
      211,
      44,
      183,
      254,
      219,
      18,
      188,
      162,
      197,
      41,
      39,
      235,
      43,
      254,
      88,
      156,
      75,
      235,
      135,
      24,
      253,
      128,
      32,
      219,
      174,
      135,
      65,
      115,
      2,
      40,
      39,
      21,
      72,
      115,
      169,
      239,
      255,
      158,
      245,
      20,
      53,
      163,
      1,
    ]);
    expect(hexToUint8Array(uint8ArrayToHex(data))).toEqual(data);
  });

  it(`should return device serial`, () => {
    expect(hmkit.getDeviceSerial()).toEqual('C5FF53CB963F2DD256');
  });

  it(`should parse access certificate`, () => {
    const accessCertificate = hmkit.parseAccessCertificate(
      'NWZ10Mx2qP/1Cyor14dHY2EpjKLpLUAEJjgGwQeA0yy3/tsSvKLFKSfrK/5YnEvrhxj9gCDbrodBcwIoJxVIc6nv/571FDWjAcX/U8uWPy3SVhEICwwAEQkLDAAHEAf//f/v/0kaWqwyti6brrWzLdDXBVq+nF5E3VXTnovwCHrw8rWekqFvgqruIR2+wWqmZc/Y2X4iE2lmWksZQEExR4Kj/2Y='
    );
    expect(accessCertificate.accessGainingSerialNumber).toEqual(
      '356675D0CC76A8FFF5'
    );
    expect(accessCertificate.accessGainingPublicKey).toEqual(
      '0B2A2BD787476361298CA2E92D4004263806C10780D32CB7FEDB12BCA2C52927EB2BFE589C4BEB8718FD8020DBAE874173022827154873A9EFFF9EF51435A301'
    );
    expect(accessCertificate.accessProvidingSerialNumber).toEqual(
      'C5FF53CB963F2DD256'
    );
    expect(accessCertificate.validityStartDate).toEqual('11080B0C00');
    expect(accessCertificate.validityEndDate).toEqual('11090B0C00');
    expect(accessCertificate.permissionsSize).toEqual('07');
    expect(accessCertificate.permissions).toEqual('1007FFFDFFEFFF');
    expect(accessCertificate.signature).toEqual(
      '491A5AAC32B62E9BAEB5B32DD0D7055ABE9C5E44DD55D39E8BF0087AF0F2B59E92A16F82AAEE211DBEC16AA665CFD8D97E221369665A4B194041314782A3FF66'
    );
  });

  it(`should parse device certificate`, () => {
    const deviceCertificate = hmkit.parseDeviceCertificate(
      'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5'
    );
    expect(deviceCertificate.issuer).toEqual('74657374');
    expect(deviceCertificate.appIdentifier).toEqual('F67FA1861680AAC916118E09');
    expect(deviceCertificate.deviceSerial).toEqual('C5FF53CB963F2DD256');
    expect(deviceCertificate.publicKey).toEqual(
      '1D5D558F2BDEF6F4C852E2F2403576E2AFCAC20FA6BA6A6D0C34F3D677DCC74FB8519053D2DEE74F6999E01C9EA8AA3ABAE75501C2FA8FB8B5D5152E28C5901C'
    );
    expect(deviceCertificate.signature).toEqual(
      'ACE96962652AB0558ECA3AEE525D2058D4F53CA2985124A9BB5FEAF6EAAB2909AC2FD52E3765BA051A8C82C48A51530B22D33B15DC36AC931D39512211E745F9'
    );
  });

  it(`should send telematics command`, () => {
    hmkit.sendTelematicsCommand('356675D0CC76A8FFF5', []);
  });
});
