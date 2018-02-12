import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { progressDecoder } from '../helpers';

export default class OffroadResponse extends PropertyResponse {
  static identifier = [0x00, 0x52];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'routeIncline').setDecoder(this.routeInclineDecoder),
      new Property(0x02, 'wheelSuspension').setDecoder(progressDecoder),
    ];

    this.parse(data, properties);
  }

  routeInclineDecoder(bytes: Array<Number>) {
    // For some reason, the 'bytesSum' is failing here
    const sum = (bytes[0] << 8) + bytes[1];

    return sum << 16 >> 16;
  }
}
