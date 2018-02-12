import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class TheftAlarmResponse extends PropertyResponse {
  static identifier = [0x00, 0x46];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'state').setDecoder(
        switchDecoder({
          0x00: 'not_armed',
          0x01: 'armed',
          0x02: 'triggered',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
