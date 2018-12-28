import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class FuelingResponse extends PropertyResponse {
  static identifier = [0x00, 0x40];

  /**
   * @property {String} gasFlapLock (string 'unlocked|locked') Gas flap lock
   * @property {String} gasFlapPosition (string 'closed|opened|intermediate') Gas flap position
   *
   * @example FuelingResponse
    {
      gasFlapLock: 'unlocked',
      gasFlapPosition: 'closed'
    }
   */
  constructor(data: Uint8Array) {
    super();
    const properties = [
      new Property(0x02, 'gasFlapLock').setDecoder(
        switchDecoder({
          0x00: 'unlocked',
          0x01: 'locked',
        })
      ),
      new Property(0x03, 'gasFlapPosition').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'opened',
          0x02: 'intermediate',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
