import getHmkit from './testutils/getHmkit';
const hmkit = getHmkit();

describe(`AccessCertificatesManager`, () => {
  it(`should return null if no matching access certificate found`, () => {
    const accessCertificate = hmkit.certificates.get('adsasddfssffsadfsaddfsa');
    expect(accessCertificate).toBe(null);
  });
});
