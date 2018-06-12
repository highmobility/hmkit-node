import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class MessagingCommand {
  /**
   * @function messageReceived
   *
   * @property {String} handle (string) Sender handle
   * @property {String} text (string) Text to send
   */
  static messageReceived(handle: string, text: string) {
    const handleBytes = stringToBytes(handle);
    const textBytes = stringToBytes(text);

    return new Command([
      0x00,
      0x37,
      0x00,
      0x01,
      ...intToTwoBytes(handleBytes.length),
      ...handleBytes,
      0x02,
      ...intToTwoBytes(textBytes.length),
      ...textBytes,
    ]);
  }
}
