import {
  bytesSum,
  chunkArray,
  switchDecoder,
  dateDecoder,
  matrixZoneDecoder,
  percentToInteger,
  progressDecoder,
} from '../src/helpers';

describe(`helpers`, () => {
  it(`should calculate bytes sum correctly`, () => {
    expect(bytesSum([0x01, 0x10])).toEqual(272);
  });

  it(`should chunk arrays correctly`, () => {
    const array = new Array(12).fill(0);
    const chunkedArray = chunkArray(array, 4);

    expect(chunkedArray.length).toEqual(4);
    expect(chunkedArray).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);

    const defaultChunk = chunkArray(new Array(12).fill(0));
    expect(defaultChunk.length).toEqual(2);
    expect(defaultChunk).toEqual([[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]);
  });

  it(`should decode switches correctly`, () => {
    const decoder = switchDecoder({
      0x00: 'disconnected',
      0x01: 'plugged_in',
      0x02: 'charging',
      0x03: 'charging_complete',
    });

    const decodedValue = decoder([0x01]);

    expect(typeof decoder).toEqual('function');
    expect(decodedValue).toEqual('plugged_in');

    expect(decoder([])).toBeNull();
  });

  it(`should decode date correctly`, () => {
    const decodedDate = dateDecoder([0x01, 0x01, 0x01, 0x01, 0x01]);
    const invalidDate = dateDecoder([0x01, 0x01, 0x01]);

    expect(decodedDate).toEqual(new Date('2001-01-01T01:01:00.000Z'));

    expect(invalidDate).toEqual(null);
  });

  it(`should decode matrix correctly`, () => {
    const matrix = matrixZoneDecoder([0x00]);
    expect(matrix).toEqual({ columns: 0, rows: 0 });
  });

  it(`should decode progress correctly`, () => {
    const progress = progressDecoder([0x5a]);
    expect(progress).toEqual(0.9);
  });

  it(`should convert percent to integer`, () => {
    expect(percentToInteger(0.5)).toEqual(50);
    expect(percentToInteger(20)).toEqual(20);
  });
});
