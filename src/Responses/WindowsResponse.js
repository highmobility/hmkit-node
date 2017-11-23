import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class WindowsResponse extends PropertyResponse {
  static identifier = [0x00, 0x45];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x00, 'frontLeft').setDecoder(this.openClosedDecoder()),
      new Property(0x01, 'frontRight').setDecoder(this.openClosedDecoder()),
      new Property(0x02, 'rearRight').setDecoder(this.openClosedDecoder()),
      new Property(0x03, 'rearLeft').setDecoder(this.openClosedDecoder())
    ];

    this.parse(data, properties);
  }

  openClosedDecoder() {
    return switchDecoder({
      0x00: 'closed',
      0x01: 'open'
    });
  }
}
