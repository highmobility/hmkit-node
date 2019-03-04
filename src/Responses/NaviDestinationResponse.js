import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
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
        data: {
          latitude: 52.520008,
          longitude: 13.404953,
        },
      },
      destinationName: {
        data: 'Narnia',
      },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x07, 'coordinates').setDecoder(coordinatesDecoder),
      new PropertyDecoder(0x02, 'destinationName').setDecoder(bytesToString),
    ];

    this.parse(data, properties, config);
  }
}
