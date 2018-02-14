import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { dateDecoder } from '../helpers';

export default class VehicleTimeResponse extends PropertyResponse {
  static identifier = [0x00, 0x50];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'vehicleTime').setDecoder(dateDecoder),
    ];

    this.parse(data, properties);
  }
}
