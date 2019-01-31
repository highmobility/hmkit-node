import PropertyResponse from '../PropertyResponse';
import Property from '../Property';

export default class OffroadResponse extends PropertyResponse {
  static identifier = [0x00, 0x52];

  /**
   * @property {Number} routeIncline (number) Route elevation incline in degrees
   * @property {Number} wheelSuspension (number) Wheel suspension percent
   *
   * @example OffroadResponse
    {
      routeIncline: 0,
      wheelSuspension: 0,
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x01, 'routeIncline').setDecoder(this.routeInclineDecoder),
      new Property(0x02, 'wheelSuspension'),
    ];

    this.parse(data, properties, config);
  }

  routeInclineDecoder(bytes: Array<Number>) {
    // For some reason, the 'bytesSum' is failing here
    const sum = (bytes[0] << 8) + bytes[1];

    return (sum << 16) >> 16;
  }
}
