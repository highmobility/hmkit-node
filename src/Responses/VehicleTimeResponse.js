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
      vehicleTime: {
        value: '2019-03-01T11:51:36.263Z',
      },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'vehicleTime').setDecoder(timestampDecoder),
    ];

    this.parse(data, properties, config);
  }
}
