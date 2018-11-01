import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder, matrixZoneDecoder, dateDecoder } from '../helpers';

export default class WindscreenResponse extends PropertyResponse {
  static identifier = [0x00, 0x42];

  /**
   * @property {String} wipers (string 'inactive|active|automatic') Wipers state
   * @property {String} wipersIntensity (string 'level_0|level_1|level_2|level_3') Wipers intensity
   * @property {String} windscreenDamage (string 'no_impact_detected | impact_but_no_damage_detected | damage_smaller_than_1_inch | damage_larger_than_1_inch') Windscreen damage
   * @property {Object} windscreenZoneMatrix (object '{rows: (number), columns: (number)}') Windscreen zone matrix
   * @property {Object} windscreenDamageZone (object '{rows: (number), columns: (number)}') Windscreen damage zone
   * @property {String} windscreenNeedsReplacement (string 'unknown|no_replacement_needed|replacement_needed') Windscreen needs replacement
   * @property {Number} windscreenDamageConfidence (number) Windscreen damage confidence
   * @property {Date} windscreenDamageDetectionTime (date) Windscreen damage detection time
   *
   * @example WindscreenResponse
    {
      wipers: 'active',
      wipersIntensity: 'level_1',
      windscreenDamage: 'damage_smaller_than_1_inch',
      windscreenZoneMatrix: {
        rows: 3,
        columns: 2,
      },
      windscreenDamageZone: {
        rows: 2,
        columns: 3,
      },
      windscreenNeedsReplacement: 'replacement_needed',
      windscreenDamageConfidence: 0,
      windscreenDamageDetectionTime: '2000-01-01T00:00:00.000Z',
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'wipers').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'automatic',
        })
      ),
      new Property(0x02, 'wipersIntensity').setDecoder(
        switchDecoder({
          0x00: 'level_0',
          0x01: 'level_1',
          0x02: 'level_2',
          0x03: 'level_3',
        })
      ),
      new Property(0x03, 'windscreenDamage').setDecoder(
        switchDecoder({
          0x00: 'no_impact_detected',
          0x01: 'impact_but_no_damage_detected',
          0x02: 'damage_smaller_than_1_inch',
          0x03: 'damage_larger_than_1_inch',
        })
      ),
      new Property(0x04, 'windscreenZoneMatrix').setDecoder(matrixZoneDecoder),
      new Property(0x05, 'windscreenDamageZone').setDecoder(matrixZoneDecoder),
      new Property(0x06, 'windscreenNeedsReplacement').setDecoder(
        switchDecoder({
          0x00: 'unknown',
          0x01: 'no_replacement_needed',
          0x02: 'replacement_needed',
        })
      ),
      new Property(0x07, 'windscreenDamageConfidence'),
      new Property(0x08, 'windscreenDamageDetectionTime').setDecoder(
        dateDecoder
      ),
    ];

    this.parse(data, properties);
  }
}
