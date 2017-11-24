import Command from './Command';
import { stringToHex, hexToUint8Array, decimalToHexArray, utfStringToByteArray } from '../encoding';

export default class MessageCommand {
  static messageReceived(handle: string, text: string) {
    const handleBytes = this.getHandleBytes(handle);
    const textBytes = this.getTextBytes(text);

    return new Command([0x00, 0x37, 0x00, ...handleBytes, ...textBytes]);
  }

  static getHandleBytes(text) {
    const stringBytes = utfStringToByteArray(text);
    return [stringBytes.length, ...stringBytes];
  }

  static getTextBytes(text) {
    const stringBytes = utfStringToByteArray(text);
    return [...decimalToHexArray(stringBytes.length, 2), ...stringBytes];
  }
}
