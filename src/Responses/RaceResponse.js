import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  activeInactiveDecoder,
  getRoundedIeee754ToBase10,
  progressDecoder,
  switchDecoder,
} from '../helpers';
import { uint8toInt8 } from '../encoding';
import OptionalProperty from '../OptionalProperty';

export default class RaceResponse extends PropertyResponse {
  static identifier = [0x00, 0x57];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'accelerations').setOptionalSubProperties('type', [
        new OptionalProperty(0x00, 'longitudinal_acceleration').setDecoder(
          this.accelerationDecoder
        ),
        new OptionalProperty(0x01, 'lateral_acceleration').setDecoder(
          this.accelerationDecoder
        ),
        new OptionalProperty(0x02, 'front_lateral_acceleration').setDecoder(
          this.accelerationDecoder
        ),
        new OptionalProperty(0x03, 'rear_lateral_acceleration').setDecoder(
          this.accelerationDecoder
        ),
      ]),
      new Property(0x02, 'understeering').setDecoder(progressDecoder),
      new Property(0x03, 'oversteering').setDecoder(progressDecoder),
      new Property(0x04, 'gasPedalPosition').setDecoder(progressDecoder),
      new Property(0x05, 'steeringAngle').setDecoder(uint8toInt8),
      new Property(0x06, 'brakePressure').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x07, 'yawRate').setDecoder(getRoundedIeee754ToBase10(2)),
      new Property(0x08, 'rearSuspensionSteering').setDecoder(uint8toInt8),
      new Property(0x09, 'electronicStabilityProgram').setDecoder(
        activeInactiveDecoder()
      ),
      new Property(0x0a, 'brakeTorqueVectorings').setDecoder(this.axleDecoder),
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

  axleDecoder(bytes) {
    const [front_axle, rear_axle] = bytes;
    const decode = switchDecoder({
      0x00: 'inactive',
      0x01: 'active',
    });

    return [
      {
        axle: 'front_axle',
        vectoring: decode([front_axle]),
      },
      {
        axle: 'rear_axle',
        vectoring: decode([rear_axle]),
      },
    ];
  }

  accelerationDecoder(...args) {
    const decoder = getRoundedIeee754ToBase10(3);

    return {
      gForce: decoder(...args),
    };
  }
}
