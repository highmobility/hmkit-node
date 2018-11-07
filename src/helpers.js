import {
  ieee754DoubleToBase10,
  ieee754ToBase10,
  pad,
  uint8toInt8,
} from './encoding';

export function bytesSum(bytes: Array<Number>) {
  const hex = bytes
    .map(decimal => pad(decimal.toString(16), 2))
    .reduce((memo, i) => memo + i, '');
  return Number(`0x${hex}`);
}

export function uint8Decoder(bytes: Array<Number>) {
  return uint8toInt8(bytesSum(bytes));
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
    const utcOffset = (bytesSum(bytes.slice(6, 8)) << 16) >> 16;
    const date = new Date();

    date.setUTCFullYear(2000 + bytes[0], bytes[1] - 1, bytes[2]);
    date.setUTCHours(bytes[3], bytes[4] - utcOffset, bytes[5], 0);

    return date;
  }

  return null;
}

export function coordinatesDecoder(data: Array<Number>) {
  return {
    latitude: getRoundedIeee754DoubleToBase10(6)(
      data.slice(0, data.length / 2)
    ),
    longitude: getRoundedIeee754DoubleToBase10(6)(data.slice(data.length / 2)),
  };
}

export function getRoundedIeee754ToBase10(precision): number {
  const precisionMultiplier = Math.pow(10, precision);

  return (...args) => {
    const unrounded = ieee754ToBase10(...args);
    return Math.round(unrounded * precisionMultiplier) / precisionMultiplier;
  };
}

export function getRoundedIeee754DoubleToBase10(precision): number {
  const precisionMultiplier = Math.pow(10, precision);

  return (...args) => {
    const unrounded = ieee754DoubleToBase10(...args);
    return Math.round(unrounded * precisionMultiplier) / precisionMultiplier;
  };
}

export function matrixZoneDecoder(bytes: Array<Number>) {
  return {
    rows: (bytes[0] & 0xf0) >> 4,
    columns: bytes[0] & 0x0f,
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

export function percentToInteger(value: Number) {
  return value > 0.0 && value < 1.0 ? value * 100 : value;
}

export function isArray(value: Any) {
  return (
    (value.BYTES_PER_ELEMENT &&
      Object.prototype.toString.call(value.buffer) ===
        `[object ArrayBuffer]`) ||
    Array.isArray(value)
  );
}
