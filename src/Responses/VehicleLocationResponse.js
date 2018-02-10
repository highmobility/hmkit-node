import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { ieee754ToBase10 } from '../encoding';

export default class VehicleLocationResponse extends PropertyResponse {
  static identifier = [0x00, 0x30];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'coordinates').setDecoder(this.coordinatesDecoder),
      new Property(0x02, 'heading').setDecoder(ieee754ToBase10),
    ];

    this.parse(data, properties);
  }

  coordinatesDecoder(bytes: Array<number>) {
    return {
      latitude: ieee754ToBase10(bytes.slice(0, bytes.length / 2)),
      longitude: ieee754ToBase10(bytes.slice(bytes.length / 2)),
    };
  }
}
