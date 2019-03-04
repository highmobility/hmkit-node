import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import {
  switchDecoder,
  matrixZoneDecoder,
  timestampDecoder,
  progressDecoder,
} from '../helpers';

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
      wipers: { data: 'active' },
      wipersIntensity: { data: 'level_3' },
      windscreenDamage: { data: 'damage_smaller_than_1_inch' },
      windscreenZoneMatrix: {
        data: {
          rows: 3,
          columns: 2,
        },
      },
      windscreenDamageZone: {
        data: {
          rows: 3,
          columns: 3,
        },
      },
      windscreenNeedsReplacement: { data: 'replacement_needed' },
      windscreenDamageConfidence: { data: 0 },
      windscreenDamageDetectionTime: { data: '2000-01-01T00:00:00.000Z' },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'wipers').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'automatic',
        })
      ),
      new PropertyDecoder(0x02, 'wipersIntensity').setDecoder(
        switchDecoder({
          0x00: 'level_0',
          0x01: 'level_1',
          0x02: 'level_2',
          0x03: 'level_3',
        })
      ),
      new PropertyDecoder(0x03, 'windscreenDamage').setDecoder(
        switchDecoder({
          0x00: 'no_impact_detected',
          0x01: 'impact_but_no_damage_detected',
          0x02: 'damage_smaller_than_1_inch',
          0x03: 'damage_larger_than_1_inch',
        })
      ),
      new PropertyDecoder(0x04, 'windscreenZoneMatrix').setDecoder(
        matrixZoneDecoder
      ),
      new PropertyDecoder(0x05, 'windscreenDamageZone').setDecoder(
        matrixZoneDecoder
      ),
      new PropertyDecoder(0x06, 'windscreenNeedsReplacement').setDecoder(
        switchDecoder({
          0x00: 'unknown',
          0x01: 'no_replacement_needed',
          0x02: 'replacement_needed',
        })
      ),
      new PropertyDecoder(0x07, 'windscreenDamageConfidence').setDecoder(
        progressDecoder
      ),
      new PropertyDecoder(0x08, 'windscreenDamageDetectionTime').setDecoder(
        timestampDecoder
      ),
    ];

    this.parse(data, properties, config);
  }
}
