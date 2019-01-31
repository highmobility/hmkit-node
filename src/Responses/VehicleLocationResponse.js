import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  coordinatesDecoder,
  getRoundedIeee754DoubleToBase10,
} from '../helpers';

export default class VehicleLocationResponse extends PropertyResponse {
  static identifier = [0x00, 0x30];

  /**
   * @property {Object} coordinates (object) Coordinates ({ latitude: (double), longitude: (double) })
   * @property {Number} heading (number) Heading in 8-bytes per IEEE 754
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
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x04, 'coordinates').setDecoder(coordinatesDecoder),
      new Property(0x05, 'heading').setDecoder(bytes =>
        getRoundedIeee754DoubleToBase10(6)(bytes, 8)
      ),
      new Property(0x06, 'altitude').setDecoder(bytes =>
        getRoundedIeee754DoubleToBase10(6)(bytes, 8)
      ),
    ];

    this.parse(data, properties, config);
  }
}
