import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';

export default class SeatsResponse extends PropertyResponse {
  static identifier = [0x00, 0x56];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'seats').setOptionalSubProperties('seatPosition', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.seatsDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.seatsDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.seatsDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.seatsDecoder),
        new OptionalProperty(0x04, 'rear_center').setDecoder(this.seatsDecoder),
      ]),
    ];

    this.parse(data, properties);
  }

  seatsDecoder(data: Array<Number>) {
    return {
      personDetected: data[0] === 0x00 ? 'not_detected' : 'detected',
      seatbeltFastened: data[1] === 0x00 ? 'not_fastened' : 'fastened',
    };
  }
}
