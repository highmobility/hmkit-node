import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class EngineResponse extends PropertyResponse {
  static identifier = [0x00, 0x35];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'ignition').setDecoder(
        switchDecoder({
          0x00: 'engine_off',
          0x01: 'engine_on',
        })
      ),
      new Property(0x02, 'accessoriesIgnition').setDecoder(
        switchDecoder({
          0x00: 'powered_off',
          0x01: 'powered_on',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
