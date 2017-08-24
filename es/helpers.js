import { pad } from './encoding';

export function bytesSum(bytes) {
  var hex = bytes.map(function (decimal) {
    return pad(decimal.toString(16), 2);
  }).reduce(function (memo, i) {
    return memo + i;
  }, '');
  return Number('0x' + hex);
}