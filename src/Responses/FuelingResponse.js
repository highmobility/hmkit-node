import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class FuelingResponse extends PropertyResponse {
  static identifier = [0x00, 0x40];

  /**
   * @property {String} gasFlap (string 'open|closed') Gas flap status
   * @property {String} gasFlapLock (string 'unlocked|locked') Gas flap lock
   * @property {String} gasFlapPosition (string 'closed|open') Gas flap position
   *
   * @example FuelingResponse
    {
      gasFlap: 'open',
      gasFlapLock: 'unlocked',
      gasFlapPosition: 'closed'
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'gasFlap').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
