import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { switchDecoder } from '../helpers';

export default class ValetModeResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'valetMode').setDecoder(
        switchDecoder({
          0x00: 'deactivated',
          0x01: 'activated'
        })
      )
    ];

    this.parseState(data, properties);
  }
}
