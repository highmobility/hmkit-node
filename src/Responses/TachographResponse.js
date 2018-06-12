import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { switchDecoder, bytesSum } from '../helpers';

export default class TachographResponse extends PropertyResponse {
  static identifier = [0x00, 0x64];

  /**
   * @property {Array<Object>} driverWorkingStates (object { driverNumber: (Number), workingState: (String 'resting|driver_available|working|driving') }) Driver working states
   * @property {Array<Object>} driverTimeStates (object { driverNumber: (Number), timeState: (String 'normal|15_min_before_4|4_reached|15_min_before_9|9_reached|15_min_before_16|16_reached') }) Driver time states
   * @property {Array<Object>} driverCards  (object { driverNumber: (Number), card: (String 'not_presented|presented') }) Driver card states
   * @property {String} vehicleMotion (string 'not_detected|detected') Vehicle motion detected
   * @property {String} vehicleOverspeed (string 'no_overspeed|overspeed') Overspeed state
   * @property {String} vehicleDirection (string 'forward|reverse') Vehicle direction
   * @property {Number} vehicleSpeed (number) Vehicle speed in km/h
   *
   * @example TachographResponse
    {
      driverWorkingStates: [
        {
          driverNumber: 1,
          workingState: 'resting',
        },
        {
          driverNumber: 2,
          workingState: 'resting',
        },
      ],
      driverTimeStates: [
        {
          driverNumber: 1,
          timeState: 'normal',
        },
        {
          driverNumber: 2,
          timeState: 'normal',
        },
      ],
      driverCards: [
        {
          driverNumber: 1,
          card: 'not_present',
        },
        {
          driverNumber: 2,
          card: 'not_present',
        },
      ],
      vehicleMotion: 'not_detected',
      vehicleOverspeed: 'no_overspeed',
      vehicleDirection: 'forward',
      vehicleSpeed: 0,
    }
  */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'driverWorkingStates').setOptionalSubProperties(
        'driverNumber',
        [
          new OptionalProperty(0x01, 1).setDecoder(
            this.driverWorkingStateDecoder
          ),
          new OptionalProperty(0x02, 2).setDecoder(
            this.driverWorkingStateDecoder
          ),
        ]
      ),
      new Property(0x02, 'driverTimeStates').setOptionalSubProperties(
        'driverNumber',
        [
          new OptionalProperty(0x01, 1).setDecoder(this.driverTimeStateDecoder),
          new OptionalProperty(0x02, 2).setDecoder(this.driverTimeStateDecoder),
        ]
      ),
      new Property(0x03, 'driverCards').setOptionalSubProperties(
        'driverNumber',
        [
          new OptionalProperty(0x01, 1).setDecoder(this.driverCardDecoder),
          new OptionalProperty(0x02, 2).setDecoder(this.driverCardDecoder),
        ]
      ),
      new Property(0x04, 'vehicleMotion').setDecoder(
        switchDecoder({
          0x00: 'not_detected',
          0x01: 'detected',
        })
      ),
      new Property(0x05, 'vehicleOverspeed').setDecoder(
        switchDecoder({
          0x00: 'no_overspeed',
          0x01: 'overspeed',
        })
      ),
      new Property(0x06, 'vehicleDirection').setDecoder(
        switchDecoder({
          0x00: 'forward',
          0x01: 'reverse',
        })
      ),
      new Property(0x07, 'vehicleSpeed').setDecoder(bytesSum),
    ];

    this.parse(data, properties);
  }

  driverWorkingStateDecoder(data: Array<Number>) {
    return {
      workingState: switchDecoder({
        0x00: 'resting',
        0x01: 'driver_available',
        0x02: 'working',
        0x03: 'driving',
      })(data),
    };
  }

  driverTimeStateDecoder(data: Array<Number>) {
    return {
      timeState: switchDecoder({
        0x00: 'normal',
        0x01: '15_min_before_4',
        0x02: '4_reached',
        0x03: '15_min_before_9',
        0x04: '9_reached',
        0x05: '15_min_before_16',
        0x06: '16_reached',
      })(data),
    };
  }

  driverCardDecoder(data: Array<Number>) {
    return {
      card: switchDecoder({
        0x00: 'not_present',
        0x01: 'present',
      })(data),
    };
  }
}
