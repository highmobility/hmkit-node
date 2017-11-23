import PropertyResponse from '../PropertyResponse';
import Property from '../Property';

export default class DoorLocksResponse extends PropertyResponse {
  static identifier = [0x00, 0x20];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x00, 'frontLeft').setDecoder(this.doorDecoder),
      new Property(0x01, 'frontRight').setDecoder(this.doorDecoder),
      new Property(0x02, 'rearRight').setDecoder(this.doorDecoder),
      new Property(0x03, 'rearLeft').setDecoder(this.doorDecoder)
    ];

    this.parse(data, properties);
  }

  doorDecoder(data: Array<Number>) {
    return {
      position: data[0] ? 'closed' : 'open',
      lock: data[1] ? 'locked' : 'unlocked'
    };
  }

  bindProperties(properties: Array<Property>) {
    this.doors = {};

    properties.forEach(property => {
      this.doors[property.namespace] = property.value;
    });
  }
}
