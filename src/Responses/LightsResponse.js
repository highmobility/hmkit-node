import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';
import { hexArrayToHex } from '../encoding';

export default class LightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x36];

  /**
   * @property {String} frontExteriorLight (string) Front exterior light state
   * @property {String} rearExteriorLight (string) Rear exterior light state
   * @property {String} interiorLight (string) Interior light state
   * @property {String} ambientLight (string) Ambient light color
   * @property {String} reverseLight (string) Reverse light state
   * @property {String} emergencyBrakeLight (string) Emergency brake light state
   *
   * @example LightsResponse
    {
      frontExteriorLight: 'inactive',
      rearExteriorLight: 'inactive',
      interiorLight: 'inactive',
      ambientLight: '#254f4c',
      reverseLight: 'active',
      emergencyBrakeLight: 'active'
    }
   */
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
      new Property(0x05, 'reverseLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x06, 'emergencyBrakeLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
    ];

    this.parse(data, properties);
  }

  ambientLightDecoder(values: Array<String>) {
    return `#${hexArrayToHex(values)}`;
  }
}
