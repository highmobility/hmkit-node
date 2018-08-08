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
      hmkit.certificates.certCache.set(
        'app_id1',
        'vehicleSerial1',
        'accessToken1',
        'cert1'
      );
    }).not.toThrow();
  });

  it(`should throw invalid json error`, () => {
    expect(() => {
      hmkit.certificates.certCache.destroy();
      hmkit.certificates.certCache.setRawStore('invalidStoreData');
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1');
    }).toThrow();

    expect(() => {
      hmkit.certificates.certCache.destroy();
      hmkit.certificates.certCache.setRawStore('invalidStoreData');
      hmkit.certificates.certCache.getByVehicleSerial(
        'appId1',
        'vehicleSerial1'
      );
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
      JSON.stringify([
        {
          ai: 'appId1',
          vs: 'vehicleSerial1',
          at: 'accessToken1',
          c: 'cert1',
          t: Date.now() + 5000,
        },
        {
          ai: 'appId2',
          vs: 'vehicleSerial2',
          at: 'accessToken2',
          c: 'cert2',
          t: Date.now() - 5000,
        },
      ])
    );

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeInstanceOf(AccessCertificate);
    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeNull();
    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeNull();

    hmkit.certificates.certCache
      .setGcTicks(2)
      .setCacheTTL(0)
      .resetGcCounter();

    const time = Date.now() + 5000;

    hmkit.certificates.certCache.setRawStore(
      JSON.stringify([
        {
          ai: 'appId1',
          vs: 'vehicleSerial1',
          at: 'accessToken1',
          c: 'cert1',
          t: time,
        },
        {
          ai: 'appId2',
          vs: 'vehicleSerial2',
          at: 'accessToken2',
          c: 'cert2',
          t: time,
        },
      ])
    );

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeNull();

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId1', 'accessToken1')
    ).toBeNull();

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeInstanceOf(AccessCertificate);

    expect(
      hmkit.certificates.certCache.getByAccessToken('appId2', 'accessToken2')
    ).toBeNull();
  });
});
