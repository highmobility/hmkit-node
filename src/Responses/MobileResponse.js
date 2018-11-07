import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class MobileResponse extends PropertyResponse {
  static identifier = [0x00, 0x66];

  /**
   * @property {String} connection (string: 'disconnected|connected') Connection state
   *
   * @example MobileResponse
    {
      connection: 'connected',
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'connection').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'connected',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
