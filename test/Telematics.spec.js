import getHmkit from './testutils/getHmkit';
const hmkit = getHmkit();

jest.setTimeout(30000);

describe(`Telematics`, () => {
  it(`should fail to fetch a nonce`, async () => {
    hmkit.clientCertificate.rawClientCertificate.clientSerial = '';
    await expect(hmkit.telematics.getNonce()).rejects.toThrow();
  });
});
