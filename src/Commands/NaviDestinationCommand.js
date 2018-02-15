import Command from './Command';
import { base10ToIeee754, intToTwoBytes, stringToBytes } from '../encoding';

export default class NaviDestinationCommand {
  static getDestination() {
    return new Command([0x00, 0x31, 0x00]);
  }

  static setDestination(
    latitude: number,
    longitude: number,
    destinationName: string = ''
  ) {
    var allNameBytes = [];

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
