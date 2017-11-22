import CapabilityResponse from './CapabilityResponse';
import Property from './Property';

export default class RooftopControlResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [new Property(0x01, 'dimming'), new Property(0x02, 'openClose')];

    this.parseState(data, properties);
  }
}
