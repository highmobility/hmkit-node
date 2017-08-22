import { hexArrayToHex } from 'src/encoding';

describe(`encoding`, () => {
  it(`should convert hex array to hex string`, () => {
    expect(hexArrayToHex([0x00, 0x10, 0x00])).toBe('001000');
  });
});
