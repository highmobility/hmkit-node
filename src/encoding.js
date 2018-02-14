import atob from 'atob';
import btoa from 'btoa';
import ieee754 from 'ieee754';

export function base64ToUint8(base64String) {
  return new Uint8Array(atob(base64String).split('').map(c => c.charCodeAt(0)));
}

export function byteArrayToBase64(byteArray) {
  const bytes = new Uint8Array(byteArray);
  return btoa(String.fromCharCode.apply(null, bytes));
}

export function asciiToUint8(string) {
  return new Uint8Array(string.split('').map(c => c.charCodeAt(0)));
}

export function uint8ArrayToHex(uint8Array) {
  return uint8Array.reduce((memo, i) => memo + pad(i.toString(16), 2), '');
}

export function hexToInt(hex) {
  return parseInt(hex, 16);
}

export function intToHex(int) {
  return int.toString(16);
}

export function intToBinary(int) {
  return int.toString(2);
}

export function uint8toInt8(uint8) {
  return uint8 << 24 >> 24;
}

export function binaryToInt(binary) {
  return parseInt(binary, 2);
}

export function hexToUint8Array(hexString) {
  if (!hexString) {
    return new Uint8Array();
  }

  const byteArray = [];

  for (let i = 0, len = hexString.length; i < len; i += 2) {
    byteArray.push(parseInt(hexString.substr(i, 2), 16));
  }

  return new Uint8Array(byteArray);
}

export function hexToByteArrays(hexString) {
  const uint8Array = hexToUint8Array(hexString);
  const byteArrays = [];

  uint8Array.forEach(uint8 => {
    byteArrays.push(
      pad(uint8.toString(2), 8).split('').map(byte => Number(byte))
    );
  });

  return byteArrays;
}

export function pad(string: string, width: number) {
  return string.length >= width
    ? string
    : new Array(width - string.length + 1).join('0') + string;
}

export function hexArrayToHex(hexArray: Array<number>) {
  return hexArray.reduce((memo, i) => memo + pad(i.toString(16), 2), '');
}

export function intToIeee754(value: number, bytes: number = 4) {
  const ieeeArray = [];
  ieee754.write(ieeeArray, value, 0, false, 23, bytes);
  return ieeeArray;
}

export function ieee754ToBase10(array: Array<number>, bytes: number = 4) {
  return ieee754.read(array, 0, false, 23, bytes);
}

export function stringToHex(string) {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    result += string[i].charCodeAt(0).toString(16);
  }
  return result;
}

export function stringToBytes(string) {
    return hexToUint8Array(stringToHex(string));
}

export function intToTwoBytes(int) {
    return hexToUint8Array(pad(intToHex(int), 4));
}

export function bytesToString(bytes) {
  return Buffer.from(bytes).toString('utf8');
}

export function decimalToHexArray(value: number, bytes: number = 1) {
  let hex = parseInt(value, 10).toString(16);
  while (hex.length % (bytes * 2) !== 0) hex = `0${hex}`;
  const hexArray = hex.match(/.{1,2}/g);

  return hexArray.map(hexItem => Number(`0x${hexItem}`));
}

export function utfStringToByteArray(string: string, minLength?: number) {
  const byteArray = unescape(encodeURIComponent(string))
    .split('')
    .map(char => char.charCodeAt(0));

  if (minLength !== undefined) {
    while (byteArray.length < minLength) {
      byteArray.unshift(0);
    }
  }

  return byteArray;
}
