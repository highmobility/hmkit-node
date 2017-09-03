import Command from './Command';
import { stringToHex, hexToUint8Array } from '../encoding';

export default class TextInputCommand {
  static textInput(text) {
    const textBytes = hexToUint8Array(stringToHex(text));

    return new Command([0x00, 0x44, 0x00, textBytes.length, ...textBytes]);
  }
}
