import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { getRoundedIeee754ToBase10 } from '../helpers';

export default class LightConditionsResponse extends PropertyResponse {
  static identifier = [0x00, 0x54];

  /**
   * @property {Number} outsideLight (number) Outside illuminance in lux, formatted as IEEE 754 decimal
   * @property {Number} outsideLight insideLight (number) Inside illuminance in lux, formatted as IEEE 754 decimal
   *
   * @example LightConditionsResponse
    {
      outsideLight: 10000,
      insideLight: 1000,
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'outsideLight').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x02, 'insideLight').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
    ];

    this.parse(data, properties);
  }
}
