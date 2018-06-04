import PropertyResponse from '../PropertyResponse';
import Property from '../Property';

export default class RooftopControlResponse extends PropertyResponse {
  static identifier = [0x00, 0x25];

  /**
   * @property {Number} dimming (number) Percentage value between 0-100 whereas 100 is opaque
   * @property {Number} position (number) Percentage value between 0-100 whereas 100 is fully open
   *
   * @example RooftopControlResponse
    {
      dimming: 23,
      position: 34,
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'dimming'),
      new Property(0x02, 'position'),
    ];

    this.parse(data, properties);
  }
}
