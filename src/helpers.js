import { pad } from './encoding';

export function bytesSum(bytes) {
  const hex = bytes.map(decimal => pad(decimal.toString(16), 2)).reduce((memo, i) => memo + i, '');
  return Number(`0x${hex}`);
}

export function switchDecoder(options: Object) {
  return (bytes: Array<Number>) => {
    return bytes.length > 0 && bytes[0] in options ? options[bytes[0]] : null;
  };
}

export function dateDecoder(bytes: Array<Number>) {
  if (bytes.length === 5) {
    const date = new Date();
    date.setYear(2000 + bytes[0]);
    date.setMonth(bytes[1] - 1);
    date.setDate(bytes[2]);
    date.setHours(bytes[3]);
    date.setMinutes(bytes[4]);
    return date.getTime();
  }

  return null;
}

export function matrixZoneDecoder(bytes: Array<Number>) {
  if (bytes.length === 0 || bytes[0] === 0x00) {
    return 'unknown';
  }

  return { horisontal: (bytes[0] & 0xf0) >> 4, vertical: bytes[0] & 0x0f };
}
