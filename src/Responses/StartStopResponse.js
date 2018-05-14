import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class StartStopResponse extends PropertyResponse {
  static identifier = [0x00, 0x63];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'startStop').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
