import Command from './Command';
import { stringToHex, hexToUint8Array, intToHex, pad } from '../encoding';

export default class MessageCommand {
  static messageReceived(handle: string, text: string) {
    const handleBytes = this.getHandleBytes(handle);
    const textBytes = this.getTextBytes(text);

    return new Command([0x00, 0x37, 0x00, ...handleBytes, ...textBytes]);
  }

  static getHandleBytes(text) {
    const stringBytes = hexToUint8Array(stringToHex(text));

    return [stringBytes.length, ...stringBytes];
  }

  static getTextBytes(text) {
    const stringBytes = hexToUint8Array(stringToHex(text));
    const lengthBytes = hexToUint8Array(pad(intToHex(stringBytes.length), 4));

    return [...lengthBytes, ...stringBytes];
  }
}
