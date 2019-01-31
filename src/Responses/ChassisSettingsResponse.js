import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { uint8toInt8 } from '../encoding';
import { switchDecoder } from '../helpers';

export default class ChassisSettingsResponse extends PropertyResponse {
  static identifier = [0x00, 0x53];

  /**
   * @property {String} drivingMode (string) Driving mode
   * @property {String} sportChrono (string) Sport chrono
   * @property {Array} currentSpringRates (array) Current spring rates ([{ axle: (string 'front_axle|rear_axle'), springRate: (number) }])
   * @property {Array} maximumSpringRates (array) Maximum spring rates ([{ axle: (string 'front_axle|rear_axle'), springRate: (number) }])
   * @property {Array} minimumSpringRates (array) Minimum spring rates ([{ axle: (string 'front_axle|rear_axle'), springRate: (number) }])
   * @property {Number} currentChassisPosition (number) Current chassis position
   * @property {Number} maximumChassisPosition (number) Maximum chassis position
   * @property {Number} minimumChassisPosition (number) Minimum chassis position
   *
   * @example ChassisSettingsResponse {
      drivingMode: 'sport',
      sportChrono: 'inactive',
      currentSpringRates: [{
        axle: 'front_axle',
        springRate: 21
      }, {
        axle: 'rear_axle',
        springRate: 21
      }],
      maximumSpringRates: [{
        axle: 'front_axle',
        springRate: 40
      }, {
        axle: 'rear_axle',
        springRate: 37
      }],
      minimumSpringRates: [{
        axle: 'front_axle',
        springRate: 17
      }, {
        axle: 'rear_axle',
        springRate: 17
      }],
      currentChassisPosition: -29,
      maximumChassisPosition: 55,
      minimumChassisPosition: -28
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x01, 'drivingMode').setDecoder(
        switchDecoder({
          0x00: 'regular',
          0x01: 'eco',
          0x02: 'sport',
          0x03: 'sport_plus',
          0x04: 'eco_plus',
        })
      ),

      new Property(0x02, 'sportChrono').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),

      new Property(0x05, 'currentSpringRates').setOptionalSubProperties(
        'axle',
        [
          new OptionalProperty(0x00, 'front_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
          new OptionalProperty(0x01, 'rear_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
        ]
      ),

      new Property(0x06, 'maximumSpringRates').setOptionalSubProperties(
        'axle',
        [
          new OptionalProperty(0x00, 'front_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
          new OptionalProperty(0x01, 'rear_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
        ]
      ),

      new Property(0x07, 'minimumSpringRates').setOptionalSubProperties(
        'axle',
        [
          new OptionalProperty(0x00, 'front_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
          new OptionalProperty(0x01, 'rear_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
        ]
      ),

      new Property(0x08, 'currentChassisPosition').setDecoder(bytes =>
        uint8toInt8(bytes[0])
      ),

      new Property(0x09, 'maximumChassisPosition').setDecoder(bytes =>
        uint8toInt8(bytes[0])
      ),

      new Property(0x0a, 'minimumChassisPosition').setDecoder(bytes =>
        uint8toInt8(bytes[0])
      ),
    ];

    this.parse(data, properties, config);
  }

  axleDataDecoder(namespace: String) {
    return (bytes: Array<Number>) => ({
      [namespace]: uint8toInt8(bytes[0]),
    });
  }
}
