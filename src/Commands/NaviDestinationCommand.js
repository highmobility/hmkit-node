import Command from './Command';
import BaseCommand from './BaseCommand';

import { base10ToIeee754Double, stringToBytes } from '../encoding';

export default class NaviDestinationCommand extends BaseCommand {
  /**
   * @function getDestination
   */
  static getDestination() {
    return new Command([0x00, 0x31, 0x00]);
  }

  /**
   * @function setDestination
   *
   * @property {Number} latitude (number) Latitude in decimal format e.g. 52.52
   * @property {Number} longitude (number) Longitude in decimal format e.g. 13.42
   * @property {String} destinationName (string) destination name
   */
  static setDestination(
    latitude: number,
    longitude: number,
    destinationName: string = ''
  ) {
    const nameBytes =
      destinationName.length > 0
        ? this.buildProperty(0x02, destinationName, stringToBytes)
        : [];

    return new Command([
      0x00,
      0x31,
      0x12,
      ...this.buildProperty(0x01, [
        ...base10ToIeee754Double(latitude),
        ...base10ToIeee754Double(longitude),
      ]),
      ...nameBytes,
    ]);
  }
}
