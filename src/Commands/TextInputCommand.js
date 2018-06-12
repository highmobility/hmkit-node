import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class TextInputCommand {
  /**
   * @function textInput
   *
   * @property {String} text (string) The text formatted in UTF-8
   */
  static textInput(text) {
    const textBytes = stringToBytes(text);
    const lengthBytes = intToTwoBytes(textBytes.length);

    return new Command([0x00, 0x44, 0x00, 0x01, ...lengthBytes, ...textBytes]);
  }
}
