import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { coordinatesDecoder } from '../helpers';
import { ieee754ToBase10 } from '../encoding';

export default class VehicleLocationResponse extends PropertyResponse {
  static identifier = [0x00, 0x30];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'coordinates').setDecoder(coordinatesDecoder),
      new Property(0x02, 'heading').setDecoder(ieee754ToBase10),
    ];

    this.parse(data, properties);
  }
}
