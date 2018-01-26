import {
  bytesSum,
  chunkArray,
  switchDecoder,
  dateDecoder,
  matrixZoneDecoder,
  autoHvacDecoder,
  autoHvacTimeDecoder,
  decimalToHexStringDecoder,
  progressDecoder
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
      0x03: 'charging_complete'
    });
    const decodedValue = decoder([0x01]);

    expect(typeof decoder).toEqual('function');
    expect(decodedValue).toEqual('plugged_id');
  });

  it(`should decode date correctly`, () => {
    const decodedDate = dateDecoder([0x01, 0x01, 0x01, 0x01, 0x01]);
    const invalidDate = dateDecoder([0x01, 0x01, 0x01]);

    expect(decodedDate).toEqual({
      year: 2001,
      month: 1,
      day: 1,
      hour: 1,
      minute: 1
    });

    expect(invalidDate).toEqual(null);
  });

  it(`should decode matrix correctly`, () => {
    const invalidMatrix = matrixZoneDecoder([0x00]);
    expect(invalidMatrix).toEqual('unknown');
  });

  it(`should decode decimals to hex correctly`, () => {
    const hexString = decimalToHexStringDecoder([10]);
    expect(hexString).toEqual('0x0a');
  });

  it(`should decode progress correctly`, () => {
    const progress = progressDecoder([0x5a]);
    expect(progress).toEqual(0.9);
  });

  it(`should decode auto hvac correctly`, () => {
    expect(
      autoHvacDecoder([
        0x00,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01
      ])
    ).toEqual({
      mondays: false,
      tuesdays: false,
      wednesdays: false,
      thursdays: false,
      fridays: false,
      saturdays: false,
      sundays: false,
      constant: false
    });

    expect(
      autoHvacDecoder([
        0xff,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01,
        0x01
      ])
    ).toEqual({
      mondays: {
        hours: 1,
        minutes: 1
      },
      tuesdays: {
        hours: 1,
        minutes: 1
      },
      wednesdays: {
        hours: 1,
        minutes: 1
      },
      thursdays: {
        hours: 1,
        minutes: 1
      },
      fridays: {
        hours: 1,
        minutes: 1
      },
      saturdays: {
        hours: 1,
        minutes: 1
      },
      sundays: {
        hours: 1,
        minutes: 1
      },
      constant: false
    });
  });

  it(`should decode auto hvac time correctly`, () => {
    const time = autoHvacTimeDecoder([0x05, 0x04]);
    expect(time).toEqual({
      hours: 5,
      minutes: 4
    });
  });
});
