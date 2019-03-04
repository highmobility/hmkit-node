import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { switchDecoder } from '../helpers';

export default class PowerTakeOffResponse extends PropertyResponse {
  static identifier = [0x00, 0x65];

  /**
   * @property {String} powerTakeoff (string 'inactive|active') Power Take-Off
   * @property {String} powerTakeoffEngaged (string 'not_engaged|engaged') Power Take-Off engaged
   *
   * @example PowerTakeOffResponse
    {
      powerTakeoff: {
        data: 'inactive',
      },
      powerTakeoffEngaged: {
        data: 'not_engaged',
      },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'powerTakeoff').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x02, 'powerTakeoffEngaged').setDecoder(
        switchDecoder({
          0x00: 'not_engaged',
          0x01: 'engaged',
        })
      ),
    ];

    this.parse(data, properties, config);
  }
}
