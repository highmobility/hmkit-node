import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { progressDecoder } from '../helpers';

export default class RooftopControlResponse extends PropertyResponse {
  static identifier = [0x00, 0x25];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'dimming').setDecoder(progressDecoder),
      new Property(0x02, 'position').setDecoder(progressDecoder)
    ];

    this.parse(data, properties);
  }
}
