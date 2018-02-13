import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { activeInactiveDecoder } from '../helpers';

export default class EngineResponse extends PropertyResponse {
  static identifier = [0x00, 0x58];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'parkingBrake').setDecoder(activeInactiveDecoder()),
    ];

    this.parse(data, properties);
  }
}
