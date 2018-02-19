import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { coordinatesDecoder, getRoundedIeee754ToBase10 } from '../helpers';

export default class VehicleLocationResponse extends PropertyResponse {
  static identifier = [0x00, 0x30];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'coordinates').setDecoder(coordinatesDecoder),
      new Property(0x02, 'heading').setDecoder(getRoundedIeee754ToBase10(6)),
    ];

    this.parse(data, properties);
  }
}
