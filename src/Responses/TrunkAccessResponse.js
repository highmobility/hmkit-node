import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class TrunkAccessResponse extends PropertyResponse {
  static identifier = [0x00, 0x21];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'trunkLock').setDecoder(
        switchDecoder({
          0x00: 'unlocked',
          0x01: 'locked',
        })
      ),
      new Property(0x02, 'trunkPosition').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
