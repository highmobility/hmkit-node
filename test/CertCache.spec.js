import getHmkit from './testutils/getHmkit';
const hmkit = getHmkit();

describe(`CertCache`, () => {
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
});
