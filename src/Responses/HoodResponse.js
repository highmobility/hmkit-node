import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class HoodResponse extends PropertyResponse {
  static identifier = [0x00, 0x67];

  /**
   * @property {String} position (string: 'closed|open|intermediate') Hood position
   *
   * @example HoodResponse
    {
      position: 'closed',
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'position').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
          0x02: 'intermediate',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
