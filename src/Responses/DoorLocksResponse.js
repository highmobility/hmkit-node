import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { switchDecoder } from '../helpers';

export default class DoorLocksResponse extends PropertyResponse {
  static identifier = [0x00, 0x20];

  /**
   * @property {Array<Object>} doors (Array<Object> { doorLocation: (String 'front_left|front_right|rear_right|rear_left'), doorPosition: (String 'open|closed'), doorLock: (String 'locked|unlocked')}`) Doors
   * @property {Array<Object>} insideDoorLocks (Array<Object>) { doorLocation: (String 'front_left|front_right|rear_right|rear_left'), insideLock: (String 'unlocked|locked') } Inside door locks
   * @property {Array<Object>} outsideDoorLocks (Array<Object>) { doorLocation: (String 'front_left|front_right|rear_right|rear_left'), outsideLock: (String 'unlocked|locked') } Outside door locks
   *
   * @example DoorLocksResponse
    {
      doors: [
        {
          doorLocation: 'front_left',
          doorPosition: 'closed',
          doorLock: 'unlocked',
        },
        {
          doorLocation: 'front_right',
          doorPosition: 'closed',
          doorLock: 'unlocked',
        },
        {
          doorLocation: 'rear_right',
          doorPosition: 'closed',
          doorLock: 'unlocked',
        },
        {
          doorLocation: 'rear_left',
          doorPosition: 'closed',
          doorLock: 'unlocked',
        },
      ],
      insideDoorLocks: [
        {
          doorLocation: 'front_left',
          insideLock: 'unlocked',
        },
        {
          doorLocation: 'front_right',
          insideLock: 'unlocked',
        },
        {
          doorLocation: 'rear_right',
          insideLock: 'unlocked',
        },
        {
          doorLocation: 'rear_left',
          insideLock: 'unlocked',
        },
      ],
      outsideDoorLocks: [
        {
          doorLocation: 'front_left',
          outsideLock: 'unlocked',
        },
        {
          doorLocation: 'front_right',
          outsideLock: 'unlocked',
        },
        {
          doorLocation: 'rear_right',
          outsideLock: 'unlocked',
        },
        {
          doorLocation: 'rear_left',
          outsideLock: 'unlocked',
        },
      ]
    }
   */
  constructor(data: Uint8Array) {
    super();

    /* prettier-ignore */
    const properties = [
      new Property(0x01, 'doors').setOptionalSubProperties('doorLocation', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.doorDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.doorDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.doorDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.doorDecoder),
      ]),
      new Property(0x02, 'insideDoorLocks').setOptionalSubProperties('doorLocation', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.insideLockDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.insideLockDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.insideLockDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.insideLockDecoder),
      ]),
      new Property(0x03, 'outsideDoorLocks').setOptionalSubProperties('doorLocation', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.outsideLockDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.outsideLockDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.outsideLockDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.outsideLockDecoder),
      ]),
    ];
    /* prettier-ignore-end */

    this.parse(data, properties);
  }

  doorDecoder(data: Array<Number>) {
    return {
      doorPosition: data[0] === 0x01 ? 'open' : 'closed',
      doorLock: data[1] === 0x01 ? 'locked' : 'unlocked',
    };
  }

  insideLockDecoder(data: Array<Number>) {
    return {
      insideLock: switchDecoder({
        0x00: 'unlocked',
        0x01: 'locked',
      })(data),
    };
  }

  outsideLockDecoder(data: Array<Number>) {
    return {
      outsideLock: switchDecoder({
        0x00: 'unlocked',
        0x01: 'locked',
      })(data),
    };
  }
}
