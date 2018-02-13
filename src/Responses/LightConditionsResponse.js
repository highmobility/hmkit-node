import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { ieee754ToBase10 } from '../encoding';

export default class LightConditionsResponse extends PropertyResponse {
  static identifier = [0x00, 0x54];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'outsideLight').setDecoder(ieee754ToBase10),
      new Property(0x02, 'insideLight').setDecoder(ieee754ToBase10),
    ];

    this.parse(data, properties);
  }
}
