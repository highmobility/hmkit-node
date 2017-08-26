import getHmkit from './testutils/getHmkit';
const hmkit = getHmkit();
import { uint8ArrayToHex, hexToUint8Array } from '../src/encoding';

describe(`sdk`, () => {
  it(`should do nothing`, () => {
    expect(1).toBe(1);
  });
});
