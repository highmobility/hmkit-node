import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class HonkHornsFlashLightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x26];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'flashersState').setDecoder(
        switchDecoder({
            0x00: 'inactive',
            0x01: 'emergency_flasher_active',
            0x02: 'left_flasher_active',
            0x03: 'right_flasher_active'
        })
      )
    ];

    this.parse(data, properties);
  }
}
