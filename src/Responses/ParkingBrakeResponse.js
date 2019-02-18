import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
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
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'parkingBrake').setDecoder(
        activeInactiveDecoder()
      ),
    ];

    this.parse(data, properties);
  }
}
