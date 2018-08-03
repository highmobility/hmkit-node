import getHmkit, { accessToken } from './testutils/getHmkit';
import AccessCertificate from '../src/AccessCertificate';
const hmkit = getHmkit();
const tempCache = JSON.stringify(hmkit.certificates.certCache.getStore());

describe(`AccessCertificatesManager`, () => {
  afterAll(() => {
    hmkit.certificates.certCache.setRawStore(tempCache);
  });

  it(`should return null if no matching access certificate found`, () => {
    hmkit.certificates.certCache.destroy();
    const accessCertificate = hmkit.certificates.get();
    expect(accessCertificate).toBe(null);
  });

  it(`should throw error on failed access certification download`, async () => {
    expect(
      hmkit.downloadAccessCertificate('pleasefailInstantly')
    ).rejects.toEqual(new Error('Failed to fetch access certificate.'));
  });

  it(`should download cert if cert is not cached already`, async () => {
    hmkit.certificates.certCache.destroy();

    const accessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );

    expect(accessCertificate).toBeInstanceOf(AccessCertificate);
    const sameAccessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );

    expect(sameAccessCertificate).toBeInstanceOf(AccessCertificate);
    expect(sameAccessCertificate).toEqual(accessCertificate);
  });

  it(`should take cert from cache if it does not have one attached to it`, async () => {
    hmkit.certificates.certCache.destroy();
    hmkit.certificates.accessCertificate = null;

    await hmkit.downloadAccessCertificate(accessToken);
    expect(hmkit.certificates.get()).toBeInstanceOf(AccessCertificate);

    hmkit.certificates.accessCertificate = null;
    await hmkit.downloadAccessCertificate(accessToken);
    expect(hmkit.certificates.get()).toBeInstanceOf(AccessCertificate);

    hmkit.certificates.accessCertificate = null;
    hmkit.certificates.certCache.destroy();
    expect(hmkit.certificates.get()).toBeNull();
  });

  it(`should download access certificate`, async () => {
    const accessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );

    expect(accessCertificate).toBeInstanceOf(AccessCertificate);
  });
});
