import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { bytesToString } from '../encoding';

// TODO: This is not a state response, should not extend CapabilityResponse(this should be renamed to CapabilityStateResponse maybe?).
export default class MessagingResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'handle').setDecoder(bytesToString),
      new Property(0x02, 'text').setDecoder(bytesToString)
    ];

    this.parseState(data, properties);
  }
}
