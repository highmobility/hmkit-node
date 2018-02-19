import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { switchDecoder } from '../helpers';

export default class WindowsResponse extends PropertyResponse {
  static identifier = [0x00, 0x45];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'windows').setOptionalSubProperties('windowPosition', [
        new OptionalProperty(0x00, 'front_left').setDecoder(
          this.openClosedDecoder
        ),
        new OptionalProperty(0x01, 'front_right').setDecoder(
          this.openClosedDecoder
        ),
        new OptionalProperty(0x02, 'rear_right').setDecoder(
          this.openClosedDecoder
        ),
        new OptionalProperty(0x03, 'rear_left').setDecoder(
          this.openClosedDecoder
        ),
        new OptionalProperty(0x04, 'hatch').setDecoder(this.openClosedDecoder),
      ]),
    ];

    this.parse(data, properties);
  }

  openClosedDecoder(bytes: Array<Number>) {
    return {
      windowState: bytes[0] === 0x00 ? 'closed' : 'open',
    };
  }
}
