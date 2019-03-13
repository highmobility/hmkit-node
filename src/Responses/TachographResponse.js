import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import { switchDecoder, bytesSum } from '../helpers';

export default class TachographResponse extends PropertyResponse {
  static identifier = [0x00, 0x64];

  /**
   * @property {Array} driverWorkingStates (object) Driver working states ({ driverNumber: (Number), workingState: (String 'resting|driver_available|working|driving') })
   * @property {Array} driverTimeStates (object) Driver time states ({ driverNumber: (Number), timeState: (String 'normal|15_min_before_4|4_reached|15_min_before_9|9_reached|15_min_before_16|16_reached') })
   * @property {Array} driverCards  (object) Driver card states ({ driverNumber: (Number), card: (String 'not_presented|presented') })
   * @property {String} vehicleMotion (string 'not_detected|detected') Vehicle motion detected
   * @property {String} vehicleOverspeed (string 'no_overspeed|overspeed') Overspeed state
   * @property {String} vehicleDirection (string 'forward|reverse') Vehicle direction
   * @property {Number} vehicleSpeed (number) Vehicle speed in km/h
   *
   * @example TachographResponse
    {
      driverWorkingStates: [{
        value: {
          driverNumber: 1,
          workingState: 'resting',
        },
      }, {
        value: {
          driverNumber: 2,
          workingState: 'resting',
        },
      }],
      driverTimeStates: [{
        value: {
          driverNumber: 1,
          timeState: 'normal',
        },
      }, {
        value: {
          driverNumber: 2,
          timeState: 'normal',
        },
      }],
      driverCards: [{
        value: {
          driverNumber: 1,
          card: 'not_present',
        },
      }, {
        value: {
          driverNumber: 2,
          card: 'not_present',
        },
      }],
      vehicleMotion: { value: 'not_detected' },
      vehicleOverspeed: { value: 'no_overspeed' },
      vehicleDirection: { value: 'forward' },
      vehicleSpeed: { value: 0 },
    }
  */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'driverWorkingStates').setOptionalSubProperties(
        'driverNumber',
        [
          new OptionalPropertyDecoder(0x01, 1).setDecoder(
            this.driverWorkingStateDecoder
          ),
          new OptionalPropertyDecoder(0x02, 2).setDecoder(
            this.driverWorkingStateDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x02, 'driverTimeStates').setOptionalSubProperties(
        'driverNumber',
        [
          new OptionalPropertyDecoder(0x01, 1).setDecoder(
            this.driverTimeStateDecoder
          ),
          new OptionalPropertyDecoder(0x02, 2).setDecoder(
            this.driverTimeStateDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x03, 'driverCards').setOptionalSubProperties(
        'driverNumber',
        [
          new OptionalPropertyDecoder(0x01, 1).setDecoder(
            this.driverCardDecoder
          ),
          new OptionalPropertyDecoder(0x02, 2).setDecoder(
            this.driverCardDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x04, 'vehicleMotion').setDecoder(
        switchDecoder({
          0x00: 'not_detected',
          0x01: 'detected',
        })
      ),
      new PropertyDecoder(0x05, 'vehicleOverspeed').setDecoder(
        switchDecoder({
          0x00: 'no_overspeed',
          0x01: 'overspeed',
        })
      ),
      new PropertyDecoder(0x06, 'vehicleDirection').setDecoder(
        switchDecoder({
          0x00: 'forward',
          0x01: 'reverse',
        })
      ),
      new PropertyDecoder(0x07, 'vehicleSpeed').setDecoder(bytesSum),
    ];

    this.parse(data, properties, config);
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
