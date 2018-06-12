import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { dateDecoder } from '../helpers';

export default class VehicleTimeResponse extends PropertyResponse {
  static identifier = [0x00, 0x50];

  /**
   * @property {Date} vehicleTime (date) Vehicle time
   *
   * @example VehicleTimeResponse
    {
      vehicleTime: 2018-02-17T12:05:02.000Z
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'vehicleTime').setDecoder(dateDecoder),
    ];

    this.parse(data, properties);
  }
}
