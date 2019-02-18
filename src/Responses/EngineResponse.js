import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { switchDecoder } from '../helpers';

export default class EngineResponse extends PropertyResponse {
  static identifier = [0x00, 0x35];

  /**
   * @property {String} ignition (string) Engine ignition state
   * @property {String} accessoriesIgnition (string) Accessories ignition state
   *
   * @example EngineResponse
    {
      ignition: 'engine_off',
      accessoriesIgnition: 'powered_off'
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'ignition').setDecoder(
        switchDecoder({
          0x00: 'engine_off',
          0x01: 'engine_on',
        })
      ),
      new PropertyDecoder(0x02, 'accessoriesIgnition').setDecoder(
        switchDecoder({
          0x00: 'powered_off',
          0x01: 'powered_on',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
