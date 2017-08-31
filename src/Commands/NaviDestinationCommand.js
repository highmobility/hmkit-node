import Command from './Command';
import {
  hexToUint8Array,
  intToHex,
  intToIeee754,
  pad,
  stringToHex,
} from '../encoding';

export default class NaviDestinationCommand {
  static setDestination(lat: number, long: number, name: string) {
    return new Command([
      0x00,
      0x31,
      0x02,
      ...intToIeee754(lat),
      ...intToIeee754(long),
      ...this.getStringBytes(name),
    ]);
  }

  static getStringBytes(name) {
    const stringBytes = hexToUint8Array(stringToHex(name));
    const lengthBytes = hexToUint8Array(pad(intToHex(stringBytes.length), 2));
    return [...lengthBytes, ...stringBytes];
  }
}
