import CapabilityResponse from './CapabilityResponse';
import Property from './Property';

export default class DoorLocksResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x00, 'frontLeft').setDecoder(this.doorDecoder),
      new Property(0x01, 'frontRight').setDecoder(this.doorDecoder),
      new Property(0x02, 'rearRight').setDecoder(this.doorDecoder),
      new Property(0x03, 'rearLeft').setDecoder(this.doorDecoder)
    ];

    this.parseState(data, properties);
  }

  doorDecoder(data: Array<Number>) {
    return {
      open: data[0],
      locked: data[1]
    };
  }
}
