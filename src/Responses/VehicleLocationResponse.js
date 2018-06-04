import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { coordinatesDecoder, getRoundedIeee754ToBase10 } from '../helpers';

export default class VehicleLocationResponse extends PropertyResponse {
  static identifier = [0x00, 0x30];

  /**
   * @property {Object} coordinates (object `{latitude: (number), longitude: (number)}`) Coordinates
   * @property {Number} heading (number) Heading in 4-bytes per IEEE 754
   * @property {Number} altitude (number) Altitude in meters above the WGS 84 reference ellipsoid
   *
   * @example VehicleLocationResponse
    {
      coordinates: {
        latitude: 52.516506,
        longitude: 13.381815,
      },
      heading: 52.520008,
      altitude: 133.5
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'coordinates').setDecoder(coordinatesDecoder),
      new Property(0x02, 'heading').setDecoder(getRoundedIeee754ToBase10(6)),
      new Property(0x03, 'altitude').setDecoder(getRoundedIeee754ToBase10(1)),
    ];

    this.parse(data, properties);
  }
}
