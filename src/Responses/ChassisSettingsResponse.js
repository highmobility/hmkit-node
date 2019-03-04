import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
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
   * @example ChassisSettingsResponse
    {
      drivingMode: { data: 'sport_plus' },
      sportChrono: { data: 'inactive' },
      currentSpringRates: [{
        data: {
          axle: 'front_axle',
          springRate: 21
        }
      }, {
        data: {
          axle: 'rear_axle',
          springRate: 25
        }
      }],
      maximumSpringRates: [{
        data: {
          axle: 'front_axle',
          springRate: 37
        }
      }, {
        data: {
          axle: 'rear_axle',
          springRate: 37
        }
      }],
      minimumSpringRates: [{
        data: {
          axle: 'front_axle',
          springRate: 17
        }
      }, {
        data: {
          axle: 'rear_axle',
          springRate: 17
        }
      }],
      currentChassisPosition: { data: 26 },
      maximumChassisPosition: { data: 55 },
      minimumChassisPosition: { data: -28 },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'drivingMode').setDecoder(
        switchDecoder({
          0x00: 'regular',
          0x01: 'eco',
          0x02: 'sport',
          0x03: 'sport_plus',
          0x04: 'eco_plus',
        })
      ),

      new PropertyDecoder(0x02, 'sportChrono').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),

      new PropertyDecoder(0x05, 'currentSpringRates').setOptionalSubProperties(
        'axle',
        [
          new OptionalPropertyDecoder(0x00, 'front_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
          new OptionalPropertyDecoder(0x01, 'rear_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
        ]
      ),

      new PropertyDecoder(0x06, 'maximumSpringRates').setOptionalSubProperties(
        'axle',
        [
          new OptionalPropertyDecoder(0x00, 'front_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
          new OptionalPropertyDecoder(0x01, 'rear_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
        ]
      ),

      new PropertyDecoder(0x07, 'minimumSpringRates').setOptionalSubProperties(
        'axle',
        [
          new OptionalPropertyDecoder(0x00, 'front_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
          new OptionalPropertyDecoder(0x01, 'rear_axle').setDecoder(
            this.axleDataDecoder('springRate')
          ),
        ]
      ),

      new PropertyDecoder(0x08, 'currentChassisPosition').setDecoder(bytes =>
        uint8toInt8(bytes[0])
      ),

      new PropertyDecoder(0x09, 'maximumChassisPosition').setDecoder(bytes =>
        uint8toInt8(bytes[0])
      ),

      new PropertyDecoder(0x0a, 'minimumChassisPosition').setDecoder(bytes =>
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
