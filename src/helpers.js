import { pad } from './encoding';

export function bytesSum(bytes) {
  const hex = bytes.map(decimal => pad(decimal.toString(16), 2)).reduce((memo, i) => memo + i, '');
  return Number(`0x${hex}`);
}

export function switchDecoder(options: Object) {
  return (byte: Number) => {
    return byte in options ? options[byte] : null;
  };
}
