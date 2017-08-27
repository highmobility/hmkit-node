import ClientCertificate from '../src/ClientCertificate';
import { base64ToUint8 } from '../src/encoding';

const clientCertificateBase64 =
  'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5';
const clientCertificateBytes = base64ToUint8(clientCertificateBase64);

describe(`ClientCertificate`, () => {
  it(`should initialize`, () => {
    const clientCertificate = new ClientCertificate(clientCertificateBytes);
    expect(clientCertificate).toBeInstanceOf(ClientCertificate);
  });

  it(`should return client certificate object`, () => {
    const clientCertificate = new ClientCertificate(clientCertificateBytes);

    expect(clientCertificate.get()).toEqual(
      expect.objectContaining({
        issuer: expect.anything(),
        appIdentifier: expect.anything(),
        clientSerial: expect.anything(),
        publicKey: expect.anything(),
      })
    );
  });

  it(`should return correct client serial`, () => {
    const clientCertificate = new ClientCertificate(clientCertificateBytes);
    expect(clientCertificate.getSerial()).toBe('C5FF53CB963F2DD256');
  });

  it(`should return correct app identifier`, () => {
    const clientCertificate = new ClientCertificate(clientCertificateBytes);
    expect(clientCertificate.getAppId()).toBe('F67FA1861680AAC916118E09');
  });
});
