import Command from './Command';
import { stringToHex, hexToUint8Array } from '../encoding';

export default class BrowserCommand {
  static loadUrl(url) {
    let command = [0x00, 0x49, 0x00];
    const urlInBytes = hexToUint8Array(stringToHex(url));
    command = [...command, urlInBytes.length, ...Array.from(urlInBytes)];
    return new Command(command);
  }
}
