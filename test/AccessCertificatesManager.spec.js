import getHmkit, { accessToken } from './testutils/getHmkit';
import AccessCertificate from '../src/AccessCertificate';
const hmkit = getHmkit();

describe(`AccessCertificatesManager`, () => {
  it(`should return null if no matching access certificate found`, () => {
    const accessCertificate = hmkit.certificates.get('adsasddfssffsadfsaddfsa');
    expect(accessCertificate).toBe(null);
  });

  it(`should download access certificate`, async () => {
    const accessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );
    expect(accessCertificate).toBeInstanceOf(AccessCertificate);
  });

  it(`should throw error on failed access certification download`, async () => {
    expect(
      hmkit.downloadAccessCertificate('pleasefailInstantly')
    ).rejects.toEqual(new Error('Failed to fetch access certificate.'));
  });
});
