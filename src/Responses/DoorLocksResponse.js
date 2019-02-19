import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import { switchDecoder } from '../helpers';

export default class DoorLocksResponse extends PropertyResponse {
  static identifier = [0x00, 0x20];

  /**
   * @property {Array} insideLocks (array) Inside door locks ([{ doorLocation: (string 'front_left|front_right|rear_right|rear_left|hatch|all'), lockState: (string 'unlocked|locked') }])
   * @property {Array} locks (array) Door locks ([{ doorLocation: (string 'front_left|front_right|rear_right|rear_left|hatch|all'), lockState: (string 'unlocked|locked') }])
   * @property {Array} positions (Array { doorLocation: (string 'front_left|front_right|rear_right|rear_left|hatch|all'), position: (string 'open|closed')}`) Positions
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
        doorLocation: 'hatch',
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
        doorLocation: 'hatch',
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
        doorLocation: 'hatch',
        position: 'closed'
      }, {
        doorLocation: 'all',
        position: 'closed'
      }]
    }

   */
  constructor(data: Uint8Array, config: Object) {
    super();

    /* prettier-ignore */
    const properties = [
      new PropertyDecoder(0x02, 'insideLocks').setOptionalSubProperties('doorLocation', [
        new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x04, 'hatch').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x05, 'all').setDecoder(this.lockDecoder),
      ]),
      new PropertyDecoder(0x03, 'locks').setOptionalSubProperties('doorLocation', [
        new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x04, 'hatch').setDecoder(this.lockDecoder),
        new OptionalPropertyDecoder(0x05, 'all').setDecoder(this.lockDecoder),
      ]),
      new PropertyDecoder(0x04, 'positions').setOptionalSubProperties('doorLocation', [
        new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(this.positionDecoder),
        new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(this.positionDecoder),
        new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(this.positionDecoder),
        new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(this.positionDecoder),
        new OptionalPropertyDecoder(0x04, 'hatch').setDecoder(this.positionDecoder),
        new OptionalPropertyDecoder(0x05, 'all').setDecoder(this.positionDecoder),
      ]),
    ];
    /* prettier-ignore-end */

    this.parse(data, properties, config);
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
