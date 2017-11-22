import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { switchDecoder } from '../helpers';

export default class LightsResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'frontExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'full_beam'
        })
      ),
      new Property(0x02, 'rearExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active'
        })
      ),
      new Property(0x03, 'interiorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active'
        })
      ),
      new Property(0x04, 'ambientLightRed'),
      new Property(0x05, 'ambientLightGreen'),
      new Property(0x06, 'ambientLightBlue')
    ];

    this.parseState(data, properties);
  }
}
