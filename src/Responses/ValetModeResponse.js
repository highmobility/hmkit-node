import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class ValetModeResponse extends PropertyResponse {
  static identifier = [0x00, 0x28];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'mode').setDecoder(
        switchDecoder({
          0x00: 'deactivated',
          0x01: 'activated',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
