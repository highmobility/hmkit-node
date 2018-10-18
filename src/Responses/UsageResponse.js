import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { getRoundedIeee754ToBase10 } from '../helpers';

export default class UsageResponse extends PropertyResponse {
  static identifier = [0x00, 0x00];

  /**
   * @property {Number} currentFuelConsumption (number) Current fuel consumption formatted in 4-bytes per IEEE 754
   * @property {Number} averageFuelConsumption (number) Average fuel consumption formatted in 4-bytes per IEEE 754
   *
   * @example UsageResponse
    {
      currentFuelConsumption: 8.7,
      averageFuelConsumption: 6.2,
    }
   */

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x0f, 'currentFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x0e, 'averageFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
    ];

    this.parse(data, properties);
  }
}
