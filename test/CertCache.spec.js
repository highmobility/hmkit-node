import getHmkit from './testutils/getHmkit';
import AccessCertificate from '../src/AccessCertificate';
const hmkit = getHmkit();

const tempCache = JSON.stringify(hmkit.certificates.certCache.getStore());

describe(`CertCache`, () => {
  afterAll(() => {
    hmkit.certificates.certCache.setGcTicks(2000).setCacheTTL(3600000);
    hmkit.certificates.certCache.setRawStore(tempCache);
  });

  it(`should return empty object when cached cert does not exist`, () => {
    expect(() => {
      hmkit.certificates.certCache.destroy();
      hmkit.certificates.certCache.set('test_key', 'test_value');
    }).not.toThrow();
  });

  it(`should throw invalid json error`, () => {
    expect(() => {
      hmkit.certificates.certCache.destroy();
      hmkit.certificates.certCache.setRawStore('test_key:test_value');
      hmkit.certificates.certCache.get('test_key');
    }).toThrow();
  });

  it(`should not throw an error if trying to destroy cache file that does not exist`, () => {
    expect(() => {
      hmkit.certificates.certCache.destroy();
      hmkit.certificates.certCache.destroy();
    }).not.toThrow();
  });

  it(`should clear cert cache correctly`, () => {
    hmkit.certificates.certCache.destroy();
    hmkit.certificates.certCache
      .setGcTicks(2)
      .setCacheTTL(0)
      .resetGcCounter();

    hmkit.certificates.certCache.setRawStore(
      JSON.stringify({
        appId1: {
          c: 'cert1',
          t: Date.now() + 5000,
        },
        appId2: {
          c: 'cert2',
          t: Date.now() - 5000,
        },
      })
    );

    expect(hmkit.certificates.certCache.get('appId1')).toBeInstanceOf(
      AccessCertificate
    );
    expect(hmkit.certificates.certCache.get('appId2')).toBeInstanceOf(
      AccessCertificate
    );

    expect(hmkit.certificates.certCache.get('appId1')).toBeNull();
    expect(hmkit.certificates.certCache.get('appId2')).toBeNull();

    hmkit.certificates.certCache
      .setGcTicks(2)
      .setCacheTTL(0)
      .resetGcCounter();

    const time = Date.now() + 5000;

    hmkit.certificates.certCache.setRawStore(
      JSON.stringify({
        appId1: {
          c: 'cert1',
          t: time,
        },
        appId2: {
          c: 'cert2',
          t: time,
        },
      })
    );

    expect(hmkit.certificates.certCache.get('appId1')).toBeInstanceOf(
      AccessCertificate
    );
    expect(hmkit.certificates.certCache.get('appId1')).toBeInstanceOf(
      AccessCertificate
    );
    expect(hmkit.certificates.certCache.get('appId1')).toBeNull();
    expect(hmkit.certificates.certCache.get('appId2')).toBeInstanceOf(
      AccessCertificate
    );
    expect(hmkit.certificates.certCache.get('appId1')).toBeNull();
    expect(hmkit.certificates.certCache.get('appId2')).toBeInstanceOf(
      AccessCertificate
    );
    expect(hmkit.certificates.certCache.get('appId2')).toBeNull();
  });
});
