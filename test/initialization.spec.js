import getHmkit from './testutils/getHmkit';
import HMKit from '../src/HMKit';

describe(`SDK initialization`, () => {
  it(`should initialize`, () => {
    const hmkit = getHmkit();
    expect(hmkit).toBeInstanceOf(HMKit);
  });
});
