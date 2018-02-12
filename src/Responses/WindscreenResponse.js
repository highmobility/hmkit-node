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
      new Property(0x01, 'state').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'automatic',
        })
      ),
      new Property(0x02, 'intensityLevel'),
      new Property(0x03, 'damage').setDecoder(
        switchDecoder({
          0x00: 'no_impact_occured',
          0x01: 'no_damage',
          0x02: 'damage_smaller_than_1_inch',
          0x03: 'damage_larger_than_1_inch',
        })
      ),
      new Property(0x04, 'zoneMatrix').setDecoder(matrixZoneDecoder),
      new Property(0x05, 'damageZone').setDecoder(matrixZoneDecoder),
      new Property(0x06, 'needsReplacement').setDecoder(
        switchDecoder({
          0x00: 'unknown',
          0x01: 'no',
          0x02: 'yes',
        })
      ),
      new Property(0x07, 'damageConfidence').setDecoder(progressDecoder),
      new Property(0x08, 'damageDetectionDate').setDecoder(dateDecoder),
    ];

    this.parse(data, properties);
  }

  bindProperties(properties: Array<Property>) {
    this.wipers = {};
    this.windscreen = {};

    properties
      .filter(property => [0x01, 0x02].includes(property.identifier))
      .forEach(property => {
        this.wipers[property.namespace] = property.value;
      });

    properties
      .filter(property =>
        [0x03, 0x04, 0x05, 0x06, 0x07, 0x08].includes(property.identifier)
      )
      .forEach(property => {
        this.windscreen[property.namespace] = property.value;
      });
  }
}
