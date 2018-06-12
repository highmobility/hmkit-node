import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class GraphicsCommand {
  /**
   * @function getState
   *
   * @property {String} url (string) Image url
   */
  static displayImage(url) {
    const urlBytes = stringToBytes(url);

    return new Command([
      0x00,
      0x51,
      0x00,
      0x01,
      ...intToTwoBytes(urlBytes.length),
      ...urlBytes,
    ]);
  }
}
