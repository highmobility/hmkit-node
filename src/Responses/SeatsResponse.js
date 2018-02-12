import PropertyResponse from '../PropertyResponse';
import Property from '../Property';

export default class SeatsResponse extends PropertyResponse {
  static identifier = [0x00, 0x56];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'seats')
        .setSubProperty(
          new Property(0x00, 'frontLeft').setDecoder(this.seatsDecoder)
        )
        .setSubProperty(
          new Property(0x01, 'frontRight').setDecoder(this.seatsDecoder)
        )
        .setSubProperty(
          new Property(0x02, 'rearRight').setDecoder(this.seatsDecoder)
        )
        .setSubProperty(
          new Property(0x03, 'rearLeft').setDecoder(this.seatsDecoder)
        )
        .setSubProperty(
          new Property(0x04, 'rearCenter').setDecoder(this.seatsDecoder)
        ),
    ];

    this.parse(data, properties);
  }

  seatsDecoder(data: Array<Number>) {
    return {
      person: data[0] === 0x00 ? 'not_detected' : 'detected',
      seatbelt: data[1] === 0x00 ? 'not_fastened' : 'fastened',
    };
  }
}
