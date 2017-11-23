import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { ieee754ToBase10 } from '../encoding';

export default class VehicleLocationResponse extends PropertyResponse {
  static identifier = [0x00, 0x30];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'latitude').setDecoder(ieee754ToBase10),
      new Property(0x02, 'longitude').setDecoder(ieee754ToBase10)
    ];

    this.parse(data, properties);
  }
}
