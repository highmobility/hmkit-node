'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bytesSum = bytesSum;

var _encoding = require('./encoding');

function bytesSum(bytes) {
  var hex = bytes.map(function (decimal) {
    return (0, _encoding.pad)(decimal.toString(16), 2);
  }).reduce(function (memo, i) {
    return memo + i;
  }, '');
  return Number('0x' + hex);
}