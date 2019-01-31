import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class ValetModeResponse extends PropertyResponse {
  static identifier = [0x00, 0x28];

  /**
   * @property {String} valetMode (string 'deactivated|activated') Valet mode state
   *
   * @example ValetModeResponse
    {
      valetMode: 'deactivated',
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x01, 'valetMode').setDecoder(
        switchDecoder({
          0x00: 'deactivated',
          0x01: 'activated',
        })
      ),
    ];

    this.parse(data, properties, config);
  }
}
