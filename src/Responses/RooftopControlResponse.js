import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { progressDecoder } from '../helpers';

export default class RooftopControlResponse extends PropertyResponse {
  static identifier = [0x00, 0x25];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'dimming'),
      new Property(0x02, 'position'),
    ];

    this.parse(data, properties);
  }
}
