import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { coordinatesDecoder } from '../helpers';
import { bytesToString } from '../encoding';

export default class NaviDestinationResponse extends PropertyResponse {
  static identifier = [0x00, 0x31];

  /**
   * @property {Object} coordinates (object `{latitude: (number), longitude: (number)}`) Coordinates
   * @property {String} destinationName (string) Destination name
   *
   * @example NaviDestinationResponse
    {
      coordinates: {
        latitude: -52.520008,
        longitude: -13.404954,
      },
      destinationName: 'Narnia',
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'coordinates').setDecoder(coordinatesDecoder),
      new Property(0x02, 'destinationName').setDecoder(bytesToString),
    ];

    this.parse(data, properties);
  }
}
