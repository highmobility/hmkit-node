import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class FuelingResponse extends PropertyResponse {
  static identifier = [0x00, 0x40];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'gasFlap').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
