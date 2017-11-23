import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesToString } from '../encoding';

// TODO: This is not a state response, should not extend CapabilityResponse(this should be renamed to CapabilityPropertyResponse maybe?).
export default class MessagingResponse extends PropertyResponse {
  static identifier = [0x00, 0x37];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'handle').setDecoder(bytesToString),
      new Property(0x02, 'text').setDecoder(bytesToString)
    ];

    this.parse(data, properties);
  }
}
