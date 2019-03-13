import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { switchDecoder } from '../helpers';

export default class TrunkAccessResponse extends PropertyResponse {
  static identifier = [0x00, 0x21];

  /**
   * @property {String} trunkLock (string 'unlocked|locked') Lock State
   * @property {String} trunkPosition (string 'closed|open') Position State
   *
   * @example TrunkAccessResponse
    {
      trunkLock: { value: 'locked' },
      trunkPosition: { value: 'closed' },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'trunkLock').setDecoder(
        switchDecoder({
          0x00: 'unlocked',
          0x01: 'locked',
        })
      ),
      new PropertyDecoder(0x02, 'trunkPosition').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
        })
      ),
    ];

    this.parse(data, properties, config);
  }
}
