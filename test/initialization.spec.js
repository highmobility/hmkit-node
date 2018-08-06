import getHmkit from './testutils/getHmkit';
import HMKit from '../src/HMKit';

describe(`SDK initialization`, () => {
  it(`should initialize`, () => {
    const hmkit = getHmkit();
    expect(hmkit).toBeInstanceOf(HMKit);
  });

  it(`should fail initialization on invalid clientPrivateKey`, () => {
    expect(
      () =>
        new HMKit(
          `dGVzdPgHaDBRAF4h4d9JHcQ1eVzCyk/SLBOHolRd4EmW7eHCKdSF3caxbvERbWg2qYAlYB2vhNjat1sGsR5C+4H0c1/yveGvs6B3YRTBf2v5IBG7y27G6vzh9z/grTD2VZA75LZ6elUHXhDh+mZC26AYm+aCP95KCc3M/VdN11TTDJKuENtsRDHKqpH0fUgl4pgVuVaaJHRs`,
          `5Pcl+Pa0CDThT9gmLv0HmCJDVvE1SXrjzcbpxeUU=`
        )
    ).toThrow();
  });
});
