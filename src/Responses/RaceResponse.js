import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import {
  activeInactiveDecoder,
  getRoundedIeee754ToBase10,
  progressDecoder,
  switchDecoder,
} from '../helpers';
import { uint8toInt8 } from '../encoding';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';

export default class RaceResponse extends PropertyResponse {
  static identifier = [0x00, 0x57];

  /**
   * @property {Object} accelerations (object '{type: (string), gForce: (number)}') Accelerations
   * @property {Number} understeering (number) Understeering percentage between 0-1
   * @property {Number} oversteering (number) Oversteering percentage between 0-1
   * @property {Number} gasPedalPosition (number) Gas pedal position percentage between 0-1
   * @property {Number} steeringAngle (number) Steering angle
   * @property {Number} brakePressure (number) Brake pressure
   * @property {Number} yawRate (number) Yaw rate
   * @property {Number} rearSuspensionSteering (number) Rear suspension steering
   * @property {String} electronicStabilityProgram (string 'active|inactive') Electronic stability program
   * @property {Object} brakeTorqueVectorings (object '{axle: (string), vectoring: (string)}') Brake torque vectorings
   * @property {String} gearMode (string 'manual|park|reverse|neutral|drive|low_gear|sport') Gear mode
   * @property {Number} selectedGear (number) Selected gear
   * @property {Number} brakePedalPosition (number) Brake pedal positioning percentage between 0-1
   * @property {String} brakePedalSwitch (string 'inactive|active') Brake pedal switch status
   * @property {String} clutchPedalSwitch (string 'inactive|active') Clutch pedal switch status
   * @property {String} acceleratorPedalIdleSwitch (string 'inactive|active') Accelerator pedal idle switch status
   * @property {String} acceleratorPedalKickdownSwitch (string 'inactive|active') Accelerator pedal kickdown switch status
   * @property {String} vehicleMoving (string 'not_moving|moving') Vehicle moving state
   *
   * @example RaceResponse
    {
      accelerations: [{
        value: {
          type: 'longitudinal_acceleration',
          gForce: 0,
        },
      }, {
        value: {
          type: 'lateral_acceleration',
          gForce: 0,
        },
      }, {
        value: {
          type: 'front_lateral_acceleration',
          gForce: 0,
        },
      }, {
        value: {
          type: 'rear_lateral_acceleration',
          gForce: 0,
        },
      }],
      understeering: { value: 0 },
      oversteering: { value: 0 },
      gasPedalPosition: { value: 0 },
      steeringAngle: { value: 0 },
      brakePressure: { value: 0 },
      yawRate: { value: 0 },
      rearSuspensionSteering: { value: 0 },
      electronicStabilityProgram: { value: 'inactive' },
      brakeTorqueVectorings: [{
        value: {
          axle: 'front_axle',
          vectoring: 'inactive',
        },
      }, {
        value: {
          axle: 'rear_axle',
          vectoring: 'inactive',
        },
      }],
      gearMode: { value: 'manual' },
      selectedGear: { value: 0 },
      brakePedalPosition: { value: 0 },
      brakePedalSwitch: { value: 'inactive' },
      clutchPedalSwitch: { value: 'inactive' },
      acceleratorPedalIdleSwitch: { value: 'inactive' },
      acceleratorPedalKickdownSwitch: { value: 'inactive' },
      vehicleMoving: { value: 'not_moving' },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'accelerations').setOptionalSubProperties(
        'type',
        [
          new OptionalPropertyDecoder(
            0x00,
            'longitudinal_acceleration'
          ).setDecoder(this.accelerationDecoder),
          new OptionalPropertyDecoder(0x01, 'lateral_acceleration').setDecoder(
            this.accelerationDecoder
          ),
          new OptionalPropertyDecoder(
            0x02,
            'front_lateral_acceleration'
          ).setDecoder(this.accelerationDecoder),
          new OptionalPropertyDecoder(
            0x03,
            'rear_lateral_acceleration'
          ).setDecoder(this.accelerationDecoder),
        ]
      ),
      new PropertyDecoder(0x02, 'understeering').setDecoder(progressDecoder),
      new PropertyDecoder(0x03, 'oversteering').setDecoder(progressDecoder),
      new PropertyDecoder(0x04, 'gasPedalPosition').setDecoder(progressDecoder),
      new PropertyDecoder(0x05, 'steeringAngle').setDecoder(uint8toInt8),
      new PropertyDecoder(0x06, 'brakePressure').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x07, 'yawRate').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x08, 'rearSuspensionSteering').setDecoder(
        uint8toInt8
      ),
      new PropertyDecoder(0x09, 'electronicStabilityProgram').setDecoder(
        activeInactiveDecoder()
      ),
      new PropertyDecoder(
        0x0a,
        'brakeTorqueVectorings'
      ).setOptionalSubProperties('axle', [
        new OptionalPropertyDecoder(0x00, 'front_axle').setDecoder(
          this.axleDecoder
        ),
        new OptionalPropertyDecoder(0x01, 'rear_axle').setDecoder(
          this.axleDecoder
        ),
      ]),
      new PropertyDecoder(0x0b, 'gearMode').setDecoder(
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
      new PropertyDecoder(0x0c, 'selectedGear'),
      new PropertyDecoder(0x0d, 'brakePedalPosition').setDecoder(
        progressDecoder
      ),
      new PropertyDecoder(0x0e, 'brakePedalSwitch').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x0f, 'clutchPedalSwitch').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x10, 'acceleratorPedalIdleSwitch').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x11, 'acceleratorPedalKickdownSwitch').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x12, 'vehicleMoving').setDecoder(
        switchDecoder({
          0x00: 'not_moving',
          0x01: 'moving',
        })
      ),
    ];

    this.parse(data, properties, config);
  }

  axleDecoder(bytes: Array<Number>) {
    return {
      vectoring: switchDecoder({
        0x00: 'inactive',
        0x01: 'active',
      })(bytes),
    };
  }

  accelerationDecoder(...args) {
    const decoder = getRoundedIeee754ToBase10(3);

    return {
      gForce: decoder(...args),
    };
  }
}
