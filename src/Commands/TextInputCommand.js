import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class TextInputCommand {
  static textInput(text) {
    const textBytes = stringToBytes(text);
    const lengthBytes = intToTwoBytes(textBytes.length);

    return new Command([0x00, 0x44, 0x00, 0x01, ...lengthBytes, ...textBytes]);
  }
}
