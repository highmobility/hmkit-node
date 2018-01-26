import { pad, intToBinary } from './encoding';

export function bytesSum(bytes: Array<Number>) {
  const hex = bytes.map(decimal => pad(decimal.toString(16), 2)).reduce((memo, i) => memo + i, '');
  return Number(`0x${hex}`);
}

export function chunkArray(array: Array<any>, chunkCount: number = 2) {
  const sets = [];
  const chunkSize = array.length / chunkCount;
  let i = 0;

  while (i < chunkCount) {
    sets[i] = array.splice(0, chunkSize);
    i++;
  }

  return sets;
}

export function switchDecoder(options: Object) {
  return (bytes: Array<Number>) =>
    bytes.length > 0 && bytes[0] in options ? options[bytes[0]] : null;
}

export function dateDecoder(bytes: Array<Number>) {
  if (bytes.length === 5) {
    return {
      year: 2000 + bytes[0],
      month: bytes[1],
      day: bytes[2],
      hour: bytes[3],
      minute: bytes[4]
    };
  } else if (bytes.length === 8) {
    return {
      year: 2000 + bytes[0],
      month: bytes[1],
      day: bytes[2],
      hour: bytes[3],
      minute: bytes[4],
      second: bytes[5],
      utcOffset: bytesSum(bytes.slice(6, 8))
    };
  }

  return null;
}

export function matrixZoneDecoder(bytes: Array<Number>) {
  if (bytes.length === 0 || bytes[0] === 0x00) {
    return 'unknown';
  }

  return { horisontal: (bytes[0] & 0xf0) >> 4, vertical: bytes[0] & 0x0f };
}

export function autoHvacDecoder(bytes: Array<Number>) {
  const [mondays, tuesdays, wednesdays, thursdays, fridays, saturdays, sundays, constant] = pad(
    intToBinary(bytes[0]),
    8
  )
    .split('')
    .map(orig => Number(orig));

  return {
    mondays: mondays ? autoHvacTimeDecoder(bytes[1], bytes[2]) : false,
    tuesdays: tuesdays ? autoHvacTimeDecoder(bytes[3], bytes[4]) : false,
    wednesdays: wednesdays ? autoHvacTimeDecoder(bytes[5], bytes[6]) : false,
    thursdays: thursdays ? autoHvacTimeDecoder(bytes[7], bytes[8]) : false,
    fridays: fridays ? autoHvacTimeDecoder(bytes[9], bytes[10]) : false,
    saturdays: saturdays ? autoHvacTimeDecoder(bytes[11], bytes[12]) : false,
    sundays: sundays ? autoHvacTimeDecoder(bytes[13], bytes[14]) : false,
    constant: !!constant
  };
}

export function autoHvacTimeDecoder(hours: Number, minutes: Number) {
  return {
    hours,
    minutes
  };
}

export function progressDecoder(bytes: Array<Number>) {
  return bytes[0] / 100;
}
