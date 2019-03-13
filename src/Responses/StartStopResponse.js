import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { switchDecoder } from '../helpers';

export default class StartStopResponse extends PropertyResponse {
  static identifier = [0x00, 0x63];

  /**
   * @property {String} startStop (string 'inactive|active') StartStop state
   *
   * @example StartStopResponse
    {
      startStop: {
        value: 'inactive',
      },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'startStop').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
    ];

    this.parse(data, properties, config);
  }
}
