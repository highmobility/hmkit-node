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
   * @property {Array<Object>} springRates (array<object>) Spring rates {axle: (string 'front_axle|rear_axle'), springRate: (number), maximumValue: (number), minimumValue: (number) }
   * @property {Object} chassisPosition (object) Chassis position {chassisPosition: (number), maximumValue: (number), minimumValue: (number)}
   *
   * @example ChassisSettingsResponse
    {
      drivingMode: 'eco',
      sportChrono: 'inactive',
      springRates: [
        {
          axle: 'front_axle',
          springRate: 21,
          maximumValue: 37,
          minimumValue: 21,
        },
        {
          axle: 'rear_axle',
          springRate: 21,
          maximumValue: 37,
          minimumValue: 17,
        },
      ],
      chassisPosition: {
        chassisPosition: 25,
        maximumValue: 55,
        minimumValue: -28,
      },
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'drivingMode').setDecoder(
        switchDecoder({
          0x00: 'regular',
          0x01: 'eco',
          0x02: 'sport',
          0x03: 'sport_plus',
        })
      ),

      new Property(0x02, 'sportChrono').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),

      new Property(0x03, 'springRates').setOptionalSubProperties('axle', [
        new OptionalProperty(0x00, 'front_axle').setDecoder(
          this.springRateDecoder
        ),
        new OptionalProperty(0x01, 'rear_axle').setDecoder(
          this.springRateDecoder
        ),
      ]),

      new Property(0x04, 'chassisPosition').setDecoder(
        this.chassisPositionDecoder
      ),
    ];

    this.parse(data, properties);
  }

  chassisPositionDecoder(bytes: Array<Number>) {
    return {
      chassisPosition: uint8toInt8(bytes[0]),
      maximumValue: uint8toInt8(bytes[1]),
      minimumValue: uint8toInt8(bytes[2]),
    };
  }

  springRateDecoder(bytes: Array<Number>) {
    return {
      springRate: uint8toInt8(bytes[0]),
      maximumValue: uint8toInt8(bytes[1]),
      minimumValue: uint8toInt8(bytes[2]),
    };
  }
}
