import Command from './Command';
import { stringToHex, hexToUint8Array, intToHex, pad } from '../encoding';

export default class VideoHandoverCommand {
  static handover(
    videoURL: string,
    startingSecond: number = 0,
    screen: string = 'front_screen'
  ) {
    return new Command([
      0x00,
      0x43,
      0x00,
      0x01,
      ...this.getVideoBytes(videoURL),
      0x02,
      ...this.getStartingFrom(startingSecond),
      0x03,
      0x00,
      0x01,
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
    switch (screen) {
      case 'rear':
      case 'rear_screen':
        return 0x01;
      default:
        return 0x00;
    }
  }
}
