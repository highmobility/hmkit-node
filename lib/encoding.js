'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToUint8 = base64ToUint8;
exports.byteArrayToBase64 = byteArrayToBase64;
exports.asciiToUint8 = asciiToUint8;
exports.uint8ArrayToHex = uint8ArrayToHex;
exports.hexToInt = hexToInt;
exports.intToHex = intToHex;
exports.hexToUint8Array = hexToUint8Array;
exports.hexToByteArrays = hexToByteArrays;
exports.pad = pad;
exports.hexArrayToHex = hexArrayToHex;
exports.ieee754ToBase10 = ieee754ToBase10;

var _atob = require('atob');

var _atob2 = _interopRequireDefault(_atob);

var _btoa = require('btoa');

var _btoa2 = _interopRequireDefault(_btoa);

var _ieee = require('ieee754');

var _ieee2 = _interopRequireDefault(_ieee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function base64ToUint8(base64String) {
  return new Uint8Array((0, _atob2.default)(base64String).split('').map(function (c) {
    return c.charCodeAt(0);
  }));
}

function byteArrayToBase64(byteArray) {
  var bytes = new Uint8Array(byteArray);
  return (0, _btoa2.default)(String.fromCharCode.apply(null, bytes));
}

function asciiToUint8(string) {
  return new Uint8Array(string.split('').map(function (c) {
    return c.charCodeAt(0);
  }));
}

function uint8ArrayToHex(uint8Array) {
  return uint8Array.reduce(function (memo, i) {
    return memo + pad(i.toString(16), 2);
  }, '');
}

function hexToInt(hex) {
  return parseInt(hex, 16);
}

function intToHex(int) {
  return int.toString(16);
}

function hexToUint8Array(hexString) {
  if (!hexString) {
    return new Uint8Array();
  }

  var byteArray = [];

  for (var i = 0, len = hexString.length; i < len; i += 2) {
    byteArray.push(parseInt(hexString.substr(i, 2), 16));
  }

  return new Uint8Array(byteArray);
}

function hexToByteArrays(hexString) {
  var uint8Array = hexToUint8Array(hexString);
  var byteArrays = [];

  uint8Array.forEach(function (uint8) {
    byteArrays.push(pad(uint8.toString(2), 8).split('').map(function (byte) {
      return Number(byte);
    }));
  });

  return byteArrays;
}

function pad(string, width) {
  return string.length >= width ? string : new Array(width - string.length + 1).join('0') + string;
}

function hexArrayToHex(hexArray) {
  return hexArray.reduce(function (memo, i) {
    return memo + pad(i.toString(16), 2);
  }, '');
}

function ieee754ToBase10(array) {
  var bytes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

  return _ieee2.default.read(array, 0, false, 23, bytes);
}