import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder, bytesSum } from '../helpers';

export default class CruiseControlResponse extends PropertyResponse {
  static identifier = [0x00, 0x62];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'cruiseControl').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x02, 'limiter').setDecoder(
        switchDecoder({
          0x00: 'not_set',
          0x01: 'higher_speed_requested',
          0x02: 'lower_speed_requested',
          0x03: 'speed_fixed',
        })
      ),
      new Property(0x03, 'targetSpeed').setDecoder(bytesSum),
      new Property(0x04, 'acc').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x05, 'accTargetSpeed').setDecoder(
        bytesSum
      ),
    ];

    this.parse(data, properties);
  }
}
