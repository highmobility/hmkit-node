import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { activeInactiveDecoder } from '../helpers';

export default class ParkingBrakeResponse extends PropertyResponse {
  static identifier = [0x00, 0x58];

  /**
   * @property {String} parkingBrake (string 'active|inactive') Parking brake
   *
   * @example ParkingBrakeResponse
    {
      parkingBrake: 'inactive',
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x01, 'parkingBrake').setDecoder(activeInactiveDecoder()),
    ];

    this.parse(data, properties, config);
  }
}
