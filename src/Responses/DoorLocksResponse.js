import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { switchDecoder } from '../helpers';

export default class DoorLocksResponse extends PropertyResponse {
  static identifier = [0x00, 0x20];

  /**
   * @property {Array} insideLocks (array) Inside door locks ([{ doorLocation: (string 'front_left|front_right|rear_right|rear_left|all'), lockState: (string 'unlocked|locked') }])
   * @property {Array} locks (array) Door locks ([{ doorLocation: (string 'front_left|front_right|rear_right|rear_left|all'), lockState: (string 'unlocked|locked') }])
   * @property {Array} positions (Array { doorLocation: (string 'front_left|front_right|rear_right|rear_left|all'), position: (string 'open|closed')}`) Positions
   *
   * @example DoorLocksResponse
    {
      insideLocks: [{
        doorLocation: 'front_left',
        lockState: 'unlocked'
      }, {
        doorLocation: 'front_right',
        lockState: 'unlocked'
      }, {
        doorLocation: 'rear_right',
        lockState: 'unlocked'
      }, {
        doorLocation: 'rear_left',
        lockState: 'unlocked'
      }, {
        doorLocation: 'all',
        lockState: 'unlocked'
      }],
      locks: [{
        doorLocation: 'front_left',
        lockState: 'unlocked'
      }, {
        doorLocation: 'front_right',
        lockState: 'unlocked'
      }, {
        doorLocation: 'rear_right',
        lockState: 'unlocked'
      }, {
        doorLocation: 'rear_left',
        lockState: 'unlocked'
      }, {
        doorLocation: 'all',
        lockState: 'unlocked'
      }],
      positions: [{
        doorLocation: 'front_left',
        position: 'closed'
      }, {
        doorLocation: 'front_right',
        position: 'closed'
      }, {
        doorLocation: 'rear_right',
        position: 'open'
      }, {
        doorLocation: 'rear_left',
        position: 'closed'
      }, {
        doorLocation: 'all',
        position: 'closed'
      }]
    }

   */
  constructor(data: Uint8Array) {
    super();

    /* prettier-ignore */
    const properties = [
      new Property(0x02, 'insideLocks').setOptionalSubProperties('doorLocation', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.lockDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.lockDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.lockDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.lockDecoder),
        new OptionalProperty(0x05, 'all').setDecoder(this.lockDecoder),
      ]),
      new Property(0x03, 'locks').setOptionalSubProperties('doorLocation', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.lockDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.lockDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.lockDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.lockDecoder),
        new OptionalProperty(0x05, 'all').setDecoder(this.lockDecoder),
      ]),
      new Property(0x04, 'positions').setOptionalSubProperties('doorLocation', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.positionDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.positionDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.positionDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.positionDecoder),
        new OptionalProperty(0x05, 'all').setDecoder(this.positionDecoder),
      ]),
    ];
    /* prettier-ignore-end */

    this.parse(data, properties);
  }

  positionDecoder(data: Array<Number>) {
    return {
      position: switchDecoder({
        0x00: 'closed',
        0x01: 'open',
      })(data),
    };
  }

  lockDecoder(data: Array<Number>) {
    return {
      lockState: switchDecoder({
        0x00: 'unlocked',
        0x01: 'locked',
      })(data),
    };
  }
}
