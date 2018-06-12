import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder, bytesSum } from '../helpers';

export default class CruiseControlResponse extends PropertyResponse {
  static identifier = [0x00, 0x62];

  /**
   * @property {String} cruiseControl (string) Cruise control state
   * @property {String} limiter (string) Limiter state
   * @property {Number} targetSpeed The target speed in km/h
   * @property {String} acc (string) Adaptive Cruise Control state
   * @property {Number} accTargetSpeed (string) The target speed in km/h of the Adaptive Cruise Control
   *
   * @example CruiseControlResponse
    {
      cruiseControl: 'inactive',
      limiter: 'not_set',
      targetSpeed: 0,
      acc: 'inactive',
      accTargetSpeed: 0,
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'cruiseControl').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x02, 'limiter').setDecoder(
        switchDecoder({
          0x00: 'not_set',
          0x01: 'higher_speed_requested',
          0x02: 'lower_speed_requested',
          0x03: 'speed_fixed',
        })
      ),
      new Property(0x03, 'targetSpeed').setDecoder(bytesSum),
      new Property(0x04, 'acc').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x05, 'accTargetSpeed').setDecoder(bytesSum),
    ];

    this.parse(data, properties);
  }
}
