import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { progressDecoder } from '../helpers';

export default class WeatherConditionsResponse extends PropertyResponse {
  static identifier = [0x00, 0x55];

  /**
   * @property {Number} rainIntensity (number) Rain intensity percentage between 0-100
   *
   * @example WeatherConditionsResponse
    {
      rainIntensity: 0.5,
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'rainIntensity').setDecoder(progressDecoder),
    ];

    this.parse(data, properties);
  }
}
