import Command from './Command';
import { stringToHex, hexToUint8Array, intToHex, pad } from '../encoding';

export default class GraphicsCommand {
  static displayImage(url) {
    let command = [0x00, 0x51, 0x00];
    const urlInBytes = hexToUint8Array(stringToHex(url));
    command = [
      ...command,
      ...this.urlSizeToBytes(urlInBytes.length),
      ...Array.from(urlInBytes),
    ];
    return new Command(command);
  }

  static urlSizeToBytes(size) {
    return hexToUint8Array(pad(intToHex(size), 4));
  }
}
