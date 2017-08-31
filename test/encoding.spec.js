import {
  hexArrayToHex,
  hexToUint8Array,
  uint8ArrayToHex,
  hexToByteArrays,
  intToHex,
  asciiToUint8,
  bytesToString,
} from '../src/encoding';

describe(`encoding`, () => {
  it(`should convert hex array to hex string`, () => {
    expect(hexArrayToHex([0x00, 0x10, 0x00])).toBe('001000');
  });

  it(`should convert uint to hex and back to uint`, () => {
    const data = new Uint8Array([
      11,
      42,
      43,
      215,
      135,
      71,
      99,
      97,
      41,
      140,
      162,
      233,
      45,
      64,
      4,
      38,
      56,
      6,
      193,
      7,
      128,
      211,
      44,
      183,
      254,
      219,
      18,
      188,
      162,
      197,
      41,
      39,
      235,
      43,
      254,
      88,
      156,
      75,
      235,
      135,
      24,
      253,
      128,
      32,
      219,
      174,
      135,
      65,
      115,
      2,
      40,
      39,
      21,
      72,
      115,
      169,
      239,
      255,
      158,
      245,
      20,
      53,
      163,
      1,
    ]);
    expect(hexToUint8Array(uint8ArrayToHex(data))).toEqual(data);
  });

  it(`should convert hex to byte arrays`, () => {
    expect(hexToByteArrays('A3CCF8')).toEqual([
      [1, 0, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0],
    ]);
  });

  it(`should convert int to hex`, () => {
    expect(intToHex(42367).toUpperCase()).toBe('A57F');
  });

  it(`should convert ascii to uint8`, () => {
    expect(asciiToUint8('asdsdgagsgsdiou')).toEqual(
      new Uint8Array([
        97,
        115,
        100,
        115,
        100,
        103,
        97,
        103,
        115,
        103,
        115,
        100,
        105,
        111,
        117,
      ])
    );
  });

  it(`should return empty uint8 array`, () => {
    expect(hexToUint8Array()).toEqual(new Uint8Array([]));
  });

  it('should convert bytes to utf8 string', () => {
    const bytes = [
      0x4c,
      0x61,
      0x70,
      0x69,
      0x6b,
      0x20,
      0x6d,
      0x61,
      0x61,
      0x20,
      0x6f,
      0x6e,
      0x20,
      0x74,
      0xc3,
      0xb5,
      0x64,
      0x65,
      0x2e,
    ];

    expect(bytesToString(bytes)).toEqual('Lapik maa on tõde.');
  });
});
