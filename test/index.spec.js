import getHmkit from './testutils/getHmkit';
const hmkit = getHmkit();
import { uint8ArrayToHex, hexToUint8Array } from '../src/encoding';

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
});
