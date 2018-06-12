import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class VideoHandoverCommand {
  /**
   * @function handover
   *
   * @property {String} videoURL (string) The URL of the video stream, formatted in UTF-8
   * @property {Number} [startingSecond] (number) The second from where the video should be started from
   * @property {String} [screen] (string) Front screen or Rear screen
   */
  static handover(
    videoURL: string,
    startingSecond: number = 0,
    screen: string = 'front'
  ) {
    const screenOptions = {
      front: 0x00,
      rear: 0x01,
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
