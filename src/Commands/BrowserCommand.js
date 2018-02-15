import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class BrowserCommand {
  static loadUrl(url) {
      const urlBytes = stringToBytes(url);

      return new Command([0x00, 0x49,
                          0x00,
                          0x01, ...intToTwoBytes(urlBytes.length), ...urlBytes
                          ])
  }
}
