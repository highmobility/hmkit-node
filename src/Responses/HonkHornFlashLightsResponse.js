import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { switchDecoder } from '../helpers';

export default class HonkHornFlashLightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x26];

  /**
   * @property {String} flashers (string 'inactive|emergency_flasher_active|left_flasher_active|right_flasher_active') Flashers
   *
   * @example HonkHornFlashLightsResponse
    {
      flashers: 'inactive',
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'flashers').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'emergency_flasher_active',
          0x02: 'left_flasher_active',
          0x03: 'right_flasher_active',
        })
      ),
    ];

    this.parse(data, properties, config);
  }
}
