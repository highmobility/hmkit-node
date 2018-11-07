import Command from './Command';
import BaseCommand from './BaseCommand';
import { intToTwoBytes, stringToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class VideoHandoverCommand extends BaseCommand {
  /**
   * @function handover
   *
   * @property {String} videoURL (string) The URL of the video stream, formatted in UTF-8
   * @property {Number} startingSecond (number) The second from where the video should be started from
   * @property {String} screen (string) Front screen or Rear screen
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

    validate([
      {
        value: videoURL,
        name: 'Video url',
        condition: Joi.string().required(),
      },
      {
        value: startingSecond,
        name: 'Starting second',
        condition: Joi.number(),
      },
      {
        value: screen,
        name: 'Screen',
        condition: Joi.string().valid(...Object.keys(screenOptions)),
      },
    ]);

    return new Command([
      0x00,
      0x43,
      0x00,
      ...this.buildProperty(0x01, stringToBytes(videoURL)),
      ...this.buildProperty(0x02, intToTwoBytes(startingSecond)),
      ...(!!screen ? this.buildProperty(0x03, screenOptions[screen]) : []),
    ]);
  }
}
