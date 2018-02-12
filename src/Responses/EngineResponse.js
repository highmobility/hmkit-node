import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class EngineResponse extends PropertyResponse {
  static identifier = [0x00, 0x35];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'engine').setDecoder(
        switchDecoder({
          0x00: 'off',
          0x01: 'on',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
