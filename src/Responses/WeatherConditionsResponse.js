import PropertyResponse from '../PropertyResponse';
import Property from '../Property';

export default class WeatherConditionsResponse extends PropertyResponse {
  static identifier = [0x00, 0x55];

  constructor(data: Uint8Array) {
    super();

    const properties = [new Property(0x01, 'rainIntensity')];

    this.parse(data, properties);
  }
}
