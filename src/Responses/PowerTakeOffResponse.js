import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class PowerTakeOffResponse extends PropertyResponse {
  static identifier = [0x00, 0x65];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'powerTakeOff').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x02, 'powerTakeOffEngaged').setDecoder(
        switchDecoder({
          0x00: 'not_engaged',
          0x01: 'engaged',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
