import DeviceCertificate from '../src/DeviceCertificate';
import { base64ToUint8 } from '../src/encoding';

const deviceCertificateBase64 =
  'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5';
const deviceCertificateBytes = base64ToUint8(deviceCertificateBase64);

describe(`DeviceCertificate`, () => {
  it(`should initialize`, () => {
    const deviceCertificate = new DeviceCertificate(deviceCertificateBytes);
    expect(deviceCertificate).toBeInstanceOf(DeviceCertificate);
  });

  it(`should return device certificate object`, () => {
    const deviceCertificate = new DeviceCertificate(deviceCertificateBytes);

    expect(deviceCertificate.get()).toEqual(
      expect.objectContaining({
        issuer: expect.anything(),
        appIdentifier: expect.anything(),
        deviceSerial: expect.anything(),
        publicKey: expect.anything(),
      })
    );
  });

  it(`should return correct device serial`, () => {
    const deviceCertificate = new DeviceCertificate(deviceCertificateBytes);
    expect(deviceCertificate.getSerial()).toBe('C5FF53CB963F2DD256');
  });

  it(`should return correct app identifier`, () => {
    const deviceCertificate = new DeviceCertificate(deviceCertificateBytes);
    expect(deviceCertificate.getAppId()).toBe('F67FA1861680AAC916118E09');
  });
});
