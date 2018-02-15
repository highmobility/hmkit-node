import { ieee754ToBase10, intToBinary, pad } from './encoding';

export function bytesSum(bytes: Array<Number>) {
  const hex = bytes
    .map(decimal => pad(decimal.toString(16), 2))
    .reduce((memo, i) => memo + i, '');
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
    const date = new Date();

    date.setUTCFullYear(2000 + bytes[0], bytes[1] - 1, bytes[2]);
    date.setUTCHours(bytes[3], bytes[4], 0, 0);

    return date;
  } else if (bytes.length === 8) {
    const utcOffset = bytesSum(bytes.slice(6, 8)) << 16 >> 16;
    const date = new Date();

    date.setUTCFullYear(2000 + bytes[0], bytes[1] - 1, bytes[2]);
    date.setUTCHours(bytes[3], bytes[4] - utcOffset, bytes[5], 0);

    return date;
  }

  return null;
}

export function coordinatesDecoder(bytes: Array<Number>) {
  return {
    latitude: ieee754ToBase10(bytes.slice(0, bytes.length / 2)),
    longitude: ieee754ToBase10(bytes.slice(bytes.length / 2)),
  };
}

export function matrixZoneDecoder(bytes: Array<Number>) {
  return {
    rows: (bytes[0] & 0xf0) >> 4,
    columns: bytes[0] & 0x0f,
  };
}

export function autoHvacDecoder(bytes: Array<Number>) {
  const [
    constant,
    sundays,
    saturdays,
    fridays,
    thursdays,
    wednesdays,
    tuesdays,
    mondays,
  ] = pad(intToBinary(bytes[0]), 8).split('').map(orig => Number(orig));

  return {
    mondays: mondays ? autoHvacTimeDecoder(bytes[1], bytes[2]) : false,
    tuesdays: tuesdays ? autoHvacTimeDecoder(bytes[3], bytes[4]) : false,
    wednesdays: wednesdays ? autoHvacTimeDecoder(bytes[5], bytes[6]) : false,
    thursdays: thursdays ? autoHvacTimeDecoder(bytes[7], bytes[8]) : false,
    fridays: fridays ? autoHvacTimeDecoder(bytes[9], bytes[10]) : false,
    saturdays: saturdays ? autoHvacTimeDecoder(bytes[11], bytes[12]) : false,
    sundays: sundays ? autoHvacTimeDecoder(bytes[13], bytes[14]) : false,
    constant: !!constant,
  };
}

export function autoHvacTimeDecoder(hours: Number, minutes: Number) {
  return {
    hours,
    minutes,
  };
}

export function progressDecoder(bytes: Array<Number>) {
  return bytes[0] / 100;
}

export function activeInactiveDecoder() {
  return switchDecoder({
    0x00: 'inactive',
    0x01: 'active',
  });
}
