import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  switchDecoder,
  matrixZoneDecoder,
  dateDecoder,
  progressDecoder,
} from '../helpers';

export default class WindscreenResponse extends PropertyResponse {
  static identifier = [0x00, 0x42];

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
