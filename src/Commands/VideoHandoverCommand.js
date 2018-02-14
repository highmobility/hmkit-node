import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class VideoHandoverCommand {
  static handover(
    videoURL: string,
    startingSecond: number = 0,
    screen: string = 'front_screen'
  ) {
    const screenOptions = {
      front_screen: 0x00,
      rear_screen: 0x01,
    };

    return new Command([
      0x00,
      0x43,
      0x00,
      0x01,
      ...this.getVideoBytes(videoURL),
      0x02,
      0x00,
      0x02,
      ...intToTwoBytes(startingSecond),
      0x03,
      0x00,
      0x01,
      screenOptions[screen],
    ]);
  }

  static getVideoBytes(video) {
    const stringBytes = stringToBytes(video);
    const lengthBytes = intToTwoBytes(stringBytes.length);

    return [...lengthBytes, ...stringBytes];
  }
}
