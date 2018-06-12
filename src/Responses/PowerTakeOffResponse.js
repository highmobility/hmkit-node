import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class PowerTakeOffResponse extends PropertyResponse {
  static identifier = [0x00, 0x65];

  /**
   * @property {String} powerTakeoff (string 'inactive|active') Power Take-Off
   * @property {String} powerTakeoffEngaged (string 'not_engaged|engaged') Power Take-Off engaged
   *
   * @example PowerTakeOffResponse
    {
      powerTakeoff: 'inactive',
      powerTakeoffEngaged: 'not_engaged'
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'powerTakeoff').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x02, 'powerTakeoffEngaged').setDecoder(
        switchDecoder({
          0x00: 'not_engaged',
          0x01: 'engaged',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
