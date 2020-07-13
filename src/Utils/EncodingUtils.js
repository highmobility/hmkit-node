/*
 *  The MIT License
 *
 *  Copyright (c) 2014- High-Mobility GmbH (https://high-mobility.com)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 *  EncodingUtils.js
 *
 *  Created by Mikk Õun on 14/01/2020.
 */

import atob from 'atob';
import btoa from 'btoa';
import ieee754 from 'ieee754';

export const PROPERTY_DATA_ID = 0x01;
export const PROPERTY_TIMESTAMP_ID = 0x02;
export const PROPERTY_FAILURE_ID = 0x03;
export const PROPERTY_AVAILABILITY_ID = 0x05;

export function bytesSum(bytes: Array<Number>) {
  const hex = Array.from(bytes)
    .map(decimal => decimal.toString(16).padStart(2, '0'))
    .join('');

  return Number(`0x${hex}`);
}

export function percentageToDouble(value: Number) {
  return base10ToIeee754Double(value);
}

export function base64ToUint8(base64String) {
  return new Uint8Array(
    atob(base64String)
      .split('')
      .map(c => c.charCodeAt(0))
  );
}

export function byteArrayToBase64(byteArray) {
  const bytes = new Uint8Array(byteArray);
  return btoa(String.fromCharCode.apply(null, bytes));
}

export function asciiToUint8(string) {
  return new Uint8Array(string.split('').map(c => c.charCodeAt(0)));
}

export function uint8ArrayToHex(uint8Array) {
  return uint8Array.reduce(
    (memo, i) => memo + i.toString(16).padStart(2, '0'),
    ''
  );
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
      uint8
        .toString(2)
        .padStart(8, '0')
        .split('')
        .map(byte => Number(byte))
    );
  });

  return byteArrays;
}

export function hexArrayToHex(hexArray: Array<number>) {
  return hexArray.reduce(
    (memo, i) => memo + i.toString(16).padStart(2, '0'),
    ''
  );
}

export function base10ToIeee754(value: number, bytes: number = 4) {
  const ieeeArray = [];
  ieee754.write(ieeeArray, value, 0, false, 23, bytes);
  return ieeeArray;
}

export function base10ToIeee754Double(value: number, bytes: number = 8) {
  const ieeeArray = [];
  ieee754.write(ieeeArray, value, 0, false, 52, bytes);
  return ieeeArray;
}

export function ieee754ToBase10(array: Array<number>, bytes: number = 4) {
  return ieee754.read(array, 0, false, 23, bytes);
}

export function ieee754DoubleToBase10(array: Array<number>, bytes: number = 8) {
  return ieee754.read(array, 0, false, 52, bytes);
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
  return hexToUint8Array(intToHex(int).padStart(4, '0'));
}

export function dateToBytes(date: Date | String) {
  if (typeof date === 'string') {
    return decimalToHexArray(new Date(date).getTime(), 8);
  }

  return decimalToHexArray(date.getTime(), 8);
}

// This also removes null bytes
export function bytesToString(bytes) {
  return Buffer.from(bytes)
    .toString('utf8')
    .replace(/\0/g, '');
}

export function bytesToTimestamp(bytes: Array<Number>) {
  return new Date(bytesSum(bytes));
}

export function bytesToCoordinates(bytes: Array<Number>) {
  return {
    latitude: getRoundedIeee754DoubleToBase10(6)(
      bytes.slice(0, bytes.length / 2)
    ),
    longitude: getRoundedIeee754DoubleToBase10(6)(
      bytes.slice(bytes.length / 2)
    ),
  };
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
