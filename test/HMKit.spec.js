import HMKit from '../src';

const clientPrivateKey = 'mOlRugZvS+2vvoLCzQg8lNzUABljCyPJ91JQl7yvQO0=';
const sandboxClientCertificate =
  'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5';

const liveClientCertificate =
  'eHZobZFfWDseixY2JmLiqGSmtgWEqHpyGU3ro/ICdsXuYNTmqHpr1tSCCJDo9tsYgbRaEvvHTVozzzDHAlwmBBAHH2K7wP9d0upIoTC0eGtXF8J7pocc9l0Lb5pIHCsdnfXASTcRrhnZ8bjmLeYPa+XW8PplCFITLDBmnvYJT9Um6QQ2Isb4DxFR8Qv7Aj3ERIV+mVxGuGEF';

describe(`HMKit`, () => {
  it(`should use production sandbox url`, () => {
    const hmkit = new HMKit(sandboxClientCertificate, clientPrivateKey);
    expect(hmkit.api.url).toBe('https://sandbox.api.high-mobility.com/v1/');
  });

  it(`should use production live url`, () => {
    const hmkit = new HMKit(liveClientCertificate, clientPrivateKey);
    expect(hmkit.api.url).toBe('https://api.high-mobility.com/v1/');
  });

  it(`should use develop sandbox url`, () => {
    const hmkit = new HMKit(
      sandboxClientCertificate,
      clientPrivateKey
    ).develop();
    expect(hmkit.api.url).toBe(
      'https://sandbox.api.develop.high-mobility.net/v1/'
    );
  });

  it(`should use develop live url`, () => {
    const hmkit = new HMKit(liveClientCertificate, clientPrivateKey).develop();
    expect(hmkit.api.url).toBe('https://api.develop.high-mobility.net/v1/');
  });

  it(`should use staging sandbox url`, () => {
    const hmkit = new HMKit(
      sandboxClientCertificate,
      clientPrivateKey
    ).staging();
    expect(hmkit.api.url).toBe(
      'https://sandbox.api.staging.high-mobility.net/v1/'
    );
  });

  it(`should use staging live url`, () => {
    const hmkit = new HMKit(liveClientCertificate, clientPrivateKey).staging();
    expect(hmkit.api.url).toBe('https://api.staging.high-mobility.net/v1/');
  });
});
