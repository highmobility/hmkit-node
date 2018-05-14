import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { switchDecoder, bytesSum } from '../helpers';

export default class TachographResponse extends PropertyResponse {
  static identifier = [0x00, 0x64];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'driverWorkingState').setOptionalSubProperties(
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
      new Property(0x02, 'driverTimeState').setOptionalSubProperties(
        'driverNumber',
        [
          new OptionalProperty(0x01, 1).setDecoder(this.driverTimeStateDecoder),
          new OptionalProperty(0x02, 2).setDecoder(this.driverTimeStateDecoder),
        ]
      ),
      new Property(0x03, 'driverCard').setOptionalSubProperties(
        'driverNumber',
        [
          new OptionalProperty(0x01, 1).setDecoder(this.driverCardDecoder),
          new OptionalProperty(0x02, 2).setDecoder(this.driverCardDecoder),
        ]
      ),
      new Property(0x04, 'motion').setDecoder(
        switchDecoder({
          0x00: 'not_detected',
          0x01: 'detected',
        })
      ),
      new Property(0x05, 'overspeed').setDecoder(
        switchDecoder({
          0x00: 'no_overspeed',
          0x01: 'overspeed',
        })
      ),
      new Property(0x06, 'direction').setDecoder(
        switchDecoder({
          0x00: 'forward',
          0x01: 'reverse',
        })
      ),
      new Property(0x07, 'speed').setDecoder(bytesSum),
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
      timeState: switchDecoder({
        0x00: 'not_present',
        0x01: 'present',
      })(data),
    };
  }
}
