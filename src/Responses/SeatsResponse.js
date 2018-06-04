import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';

export default class SeatsResponse extends PropertyResponse {
  static identifier = [0x00, 0x56];

  /**
   * @property {Array<Object>} seats (array `{seatPosition: (string 'front_left|front_right|rear_right|rear_left|rear_center'), personDetected: (string 'detected|not_detected'), seatbeltFastened: (string 'fastened|not_fastened')}`) Seats
   *
   * @example SeatsResponse
    {
      seats: [
        {
          seatPosition: 'front_left',
          personDetected: 'not_detected',
          seatbeltFastened: 'not_fastened',
        },
        {
          seatPosition: 'front_right',
          personDetected: 'not_detected',
          seatbeltFastened: 'not_fastened',
        },
        {
          seatPosition: 'rear_right',
          personDetected: 'not_detected',
          seatbeltFastened: 'not_fastened',
        },
        {
          seatPosition: 'rear_left',
          personDetected: 'not_detected',
          seatbeltFastened: 'not_fastened',
        },
        {
          seatPosition: 'rear_center',
          personDetected: 'not_detected',
          seatbeltFastened: 'not_fastened',
        },
      ],
    }
   */
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
