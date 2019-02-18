import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { timestampDecoder } from '../helpers';

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
      new PropertyDecoder(0x01, 'vehicleTime').setDecoder(timestampDecoder),
    ];

    this.parse(data, properties);
  }
}
