import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { switchDecoder } from '../helpers';

export default class EngineResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'engineOn').setDecoder(
        switchDecoder({
          0x00: 'off',
          0x01: 'on'
        })
      )
    ];

    this.parseState(data, properties);
  }
}
