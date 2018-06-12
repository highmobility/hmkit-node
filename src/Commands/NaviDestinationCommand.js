import Command from './Command';
import { base10ToIeee754, intToTwoBytes, stringToBytes } from '../encoding';

export default class NaviDestinationCommand {
  /**
   * @function getDestination
   */
  static getDestination() {
    return new Command([0x00, 0x31, 0x00]);
  }

  /**
   * @function setDestination
   *
   * @property {Number} latitude (number) Latitude in decimal format e.g. 52.520008
   * @property {Number} longitude (number) Longitude in decimal format e.g. 13.404954
   * @property {String} destinationName (string) destination name
   */
  static setDestination(
    latitude: number,
    longitude: number,
    destinationName: string = ''
  ) {
    let allNameBytes = [];

    if (destinationName.length > 0) {
      const nameBytes = stringToBytes(destinationName);

      allNameBytes = [0x02, ...intToTwoBytes(nameBytes.length), ...nameBytes];
    }

    return new Command([
      0x00,
      0x31,
      0x02,
      0x01,
      0x00,
      0x08,
      ...base10ToIeee754(latitude),
      ...base10ToIeee754(longitude),
      ...allNameBytes,
    ]);
  }
}
