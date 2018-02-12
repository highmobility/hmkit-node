import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  activeInactiveDecoder,
  progressDecoder,
  switchDecoder,
} from '../helpers';
import { ieee754ToBase10, uint8toInt8 } from '../encoding';

export default class RaceResponse extends PropertyResponse {
  static identifier = [0x00, 0x57];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'accelerations')
        .setSubProperty(
          new Property(0x00, 'longitudinal').setDecoder(ieee754ToBase10)
        )
        .setSubProperty(
          new Property(0x01, 'lateral').setDecoder(ieee754ToBase10)
        )
        .setSubProperty(
          new Property(0x02, 'frontLateral').setDecoder(ieee754ToBase10)
        )
        .setSubProperty(
          new Property(0x03, 'rearLateral').setDecoder(ieee754ToBase10)
        ),
      new Property(0x02, 'understeering').setDecoder(progressDecoder),
      new Property(0x03, 'oversteering').setDecoder(progressDecoder),
      new Property(0x04, 'gasPedalPosition').setDecoder(progressDecoder),
      new Property(0x05, 'steeringAngle').setDecoder(uint8toInt8),
      new Property(0x06, 'brakePressure').setDecoder(ieee754ToBase10),
      new Property(0x07, 'yawRate').setDecoder(ieee754ToBase10),
      new Property(0x08, 'rearSuspensionSteering').setDecoder(uint8toInt8),
      new Property(0x09, 'electronicStabilityProgram').setDecoder(
        activeInactiveDecoder()
      ),
      new Property(0x0a, 'brakeTorqueVectorings')
        .setSubProperty(
          new Property(0x00, 'frontAxle').setDecoder(activeInactiveDecoder())
        )
        .setSubProperty(
          new Property(0x01, 'rearAxle').setDecoder(activeInactiveDecoder())
        ),
      new Property(0x0b, 'gearMode').setDecoder(
        switchDecoder({
          0x00: 'manual',
          0x01: 'park',
          0x02: 'reverse',
          0x03: 'neutral',
          0x04: 'drive',
          0x05: 'low_gear',
          0x06: 'sport',
        })
      ),
      new Property(0x0c, 'selectedGear'),
      new Property(0x0d, 'brakePedalPosition').setDecoder(progressDecoder),
    ];

    this.parse(data, properties);
  }
}
