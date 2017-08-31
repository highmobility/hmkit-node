import Command from './Command';
import { stringToHex, hexToUint8Array, intToHex, pad } from '../encoding';

export default class VideoHandoverCommand {
  static play(
    video: string,
    startingFrom: number = 0,
    screen: string = 'front'
  ) {
    return new Command([
      0x00,
      0x43,
      0x00,
      ...this.getVideoBytes(video),
      ...this.getStartingFrom(startingFrom),
      this.getSceenByte(screen),
    ]);
  }

  static getVideoBytes(video) {
    const stringBytes = hexToUint8Array(stringToHex(video));
    const lengthBytes = hexToUint8Array(pad(intToHex(stringBytes.length), 4));
    return [...lengthBytes, ...stringBytes];
  }

  static getStartingFrom(startingFrom) {
    return hexToUint8Array(pad(intToHex(startingFrom), 4));
  }

  static getSceenByte(screen) {
    return screen === 'rear' ? 0x01 : 0x00;
  }
}
