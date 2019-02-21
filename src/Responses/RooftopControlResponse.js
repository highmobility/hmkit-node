import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder, progressDecoder } from '../helpers';

export default class RooftopControlResponse extends PropertyResponse {
  static identifier = [0x00, 0x25];

  /**
   * @property {Number} dimming (number) Percentage value between 0-1 whereas 1 is opaque
   * @property {Number} position (number) Percentage value between 0-1 whereas 1 is fully open
   * @property {String} convertibleRoof (string 'closed | open | emergency_locked | closed_secured | open_secured | hard_top_mounted | intermediate_position | loading_position | loading_position_immediate') Convertible roof state
   * @property {String} sunroofTilt (string 'closed|tilted|half_tilted') Sunroof tilt state
   * @property {String} sunroofState (string 'closed|open|intermediate') Sunroof state
   *
   * @example RooftopControlResponse
    {
      dimming: 0.2,
      position: 0.3,
      convertibleRoof: 'closed',
      sunroofTilt: 'closed',
      sunroofState: 'open'
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'dimming').setDecoder(progressDecoder),
      new Property(0x02, 'position').setDecoder(progressDecoder),
      new Property(0x03, 'convertibleRoof').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
          0x02: 'emergency_locked',
          0x03: 'closed_secured',
          0x04: 'open_secured',
          0x05: 'hard_top_mounted',
          0x06: 'intermediate_position',
          0x07: 'loading_position',
          0x08: 'loading_position_immediate',
        })
      ),
      new Property(0x04, 'sunroofTilt').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'tilted',
          0x02: 'half_tilted',
        })
      ),
      new Property(0x05, 'sunroofState').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
          0x02: 'intermediate',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
