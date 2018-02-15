import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';
import { hexArrayToHex } from '../encoding';

export default class LightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x36];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'frontExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'active_with_full_beam',
        })
      ),
      new Property(0x02, 'rearExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x03, 'interiorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x04, 'ambientLight').setDecoder(this.ambientLightDecoder),
    ];

    this.parse(data, properties);
  }

  ambientLightDecoder(values: Array<String>) {
    return `#${hexArrayToHex(values)}`;
  }
}
