import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { coordinatesDecoder } from '../helpers';
import { bytesToString } from '../encoding';

export default class NaviDestinationResponse extends PropertyResponse {
  static identifier = [0x00, 0x31];

  /**
   * @property {Object} coordinates (object) Coordinates ({ latitude: (double), longitude: (double) })
   * @property {String} destinationName (string) Destination name
   *
   * @example NaviDestinationResponse
    {
      coordinates: {
        latitude: 52.52,
        longitude: 13.42,
      },
      destinationName: 'Narnia',
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x07, 'coordinates').setDecoder(coordinatesDecoder),
      new Property(0x02, 'destinationName').setDecoder(bytesToString),
    ];

    this.parse(data, properties, config);
  }
}
