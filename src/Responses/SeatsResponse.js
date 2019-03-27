import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';

export default class SeatsResponse extends PropertyResponse {
  static identifier = [0x00, 0x56];

  /**
   * @property {Array} personsDetected (array) Persons detected ([{ seatPosition: (string: 'front_left|front_right|rear_right|rear_left|rear_center'), personDetected: (string: 'not_detected|detected')}])
   * @property {Array} seatbeltsFastened (array) Seatbelts fastened ([{ seatPosition: (string: 'front_left|front_right|rear_right|rear_left|rear_center', seatbeltFastened: (string: 'not_fastened|fastened')) }])
   *
   * @example SeatsResponse
    {
      personsDetected: [{
        value: {
          seatPosition: 'front_left',
          personDetected: 'not_detected'
        },
      }, {
        value: {
          seatPosition: 'front_right',
          personDetected: 'not_detected'
        },
      }, {
        value: {
          seatPosition: 'rear_right',
          personDetected: 'not_detected'
        },
      }, {
        value: {
          seatPosition: 'rear_left',
          personDetected: 'not_detected'
        }
      }],
      seatbeltsFastened: [{
        value: {
          seatPosition: 'front_left',
          seatbeltFastened: 'not_fastened',
        },
      }, {
        value: {
          seatPosition: 'front_right',
          seatbeltFastened: 'not_fastened',
        },
      }, {
        value: {
          seatPosition: 'rear_right',
          seatbeltFastened: 'not_fastened',
        },
      }, {
        value: {
          seatPosition: 'rear_left',
          seatbeltFastened: 'not_fastened'
        },
      }],
    }
   */
  constructor(data: Uint8Array, config: Object) {
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

    this.parse(data, properties, config);
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
