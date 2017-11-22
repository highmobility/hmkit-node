import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { switchDecoder, matrixZoneDecoder, dateDecoder } from '../helpers';

// TODO: Wiper and windscreen should be two different objects
export default class WindscreenResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'wiper').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'automatic'
        })
      ),
      new Property(0x02, 'intensity').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'level_1',
          0x02: 'level_2',
          0x03: 'level_3'
        })
      ),
      new Property(0x03, 'windscreenDamage').setDecoder(
        switchDecoder({
          0x00: 'no_impact_occured',
          0x01: 'no_damage',
          0x02: 'damage_smaller_than_1_inch',
          0x03: 'damage_larger_than_1_inch'
        })
      ),
      new Property(0x04, 'zoneMatrix').setDecoder(matrixZoneDecoder),
      new Property(0x05, 'damageZone').setDecoder(matrixZoneDecoder),
      new Property(0x06, 'needsReplacement').setDecoder(
        switchDecoder({
          0x00: 'unknown',
          0x01: 'no',
          0x02: 'yes'
        })
      ),
      new Property(0x07, 'windscreenDamageConfidence'),
      new Property(0x08, 'damageDetected').setDecoder(dateDecoder)
    ];

    this.parseState(data, properties);
  }
}
