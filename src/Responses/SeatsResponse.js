import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';

export default class SeatsResponse extends PropertyResponse {
  static identifier = [0x00, 0x56];

  /**
   * @property {Array} personsDetected (array) Persons detected ([{ seatPosition: (string: 'front_left|front_right|rear_right|rear_left|rear_center'), personDetected: (string: 'not_detected|detected')}])
   * @property {Array} seatbeltsFastened (array) Seatbelts fastened ([{ seatPosition: (string: 'front_left|front_right|rear_right|rear_left|rear_center', seatbeltFastened: (string: 'not_fastened|fastened')) }])
   *
   * @example SeatsResponse {
      personsDetected: [{
        seatPosition: 'front_left',
        personDetected: 'detected'
      }, {
        seatPosition: 'front_right',
        personDetected: 'detected'
      }, {
        seatPosition: 'rear_right',
        personDetected: 'detected'
      }, {
        seatPosition: 'rear_left',
        personDetected: 'detected'
      }, {
        seatPosition: 'rear_center',
        personDetected: 'not_detected'
      }],
      seatbeltsFastened: [{
        seatPosition: 'front_left',
        seatbeltFastened: 'fastened'
      }, {
        seatPosition: 'front_right',
        seatbeltFastened: 'fastened'
      }, {
        seatPosition: 'rear_right',
        seatbeltFastened: 'fastened'
      }, {
        seatPosition: 'rear_left',
        seatbeltFastened: 'fastened'
      }, {
        seatPosition: 'rear_center',
        seatbeltFastened: 'not_fastened'
      }]
    }

   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new PropertyDecoder(0x02, 'personsDetected').setOptionalSubProperties(
        'seatPosition',
        [
          new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(
            this.personDetectedDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(
            this.personDetectedDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(
            this.personDetectedDecoder
          ),
          new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(
            this.personDetectedDecoder
          ),
          new OptionalPropertyDecoder(0x04, 'rear_center').setDecoder(
            this.personDetectedDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x03, 'seatbeltsFastened').setOptionalSubProperties(
        'seatPosition',
        [
          new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(
            this.seatbeltFastenedDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(
            this.seatbeltFastenedDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(
            this.seatbeltFastenedDecoder
          ),
          new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(
            this.seatbeltFastenedDecoder
          ),
          new OptionalPropertyDecoder(0x04, 'rear_center').setDecoder(
            this.seatbeltFastenedDecoder
          ),
        ]
      ),
    ];

    this.parse(data, properties);
  }

  personDetectedDecoder(data: Array<Number>) {
    return {
      personDetected: data[0] === 0x00 ? 'not_detected' : 'detected',
    };
  }

  seatbeltFastenedDecoder(data: Array<Number>) {
    return {
      seatbeltFastened: data[0] === 0x00 ? 'not_fastened' : 'fastened',
    };
  }
}
