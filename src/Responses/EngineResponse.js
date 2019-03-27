import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { switchDecoder } from '../helpers';

export default class EngineResponse extends PropertyResponse {
  static identifier = [0x00, 0x35];

  /**
   * @property {String} ignition (string 'on|off') Engine ignition state
   * @property {String} accessoriesIgnition (string 'on|off') Accessories ignition state
   *
   * @example EngineResponse
    {
      ignition: {
        value: 'off'
      },
      accessoriesIgnition: {
        value: 'off'
      },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'ignition').setDecoder(
        switchDecoder({
          0x00: 'off',
          0x01: 'on',
        })
      ),
      new PropertyDecoder(0x02, 'accessoriesIgnition').setDecoder(
        switchDecoder({
          0x00: 'off',
          0x01: 'on',
        })
      ),
    ];

    this.parse(data, properties, config);
  }
}
