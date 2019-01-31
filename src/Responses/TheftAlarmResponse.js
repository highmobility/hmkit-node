import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class TheftAlarmResponse extends PropertyResponse {
  static identifier = [0x00, 0x46];

  /**
   * @property {String} theftAlarm (string 'not_armed|armed|triggered') Theft alarm state
   *
   * @example TheftAlarmResponse
    {
      theftAlarm: 'triggered',
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x01, 'theftAlarm').setDecoder(
        switchDecoder({
          0x00: 'not_armed',
          0x01: 'armed',
          0x02: 'triggered',
        })
      ),
    ];

    this.parse(data, properties, config);
  }
}
