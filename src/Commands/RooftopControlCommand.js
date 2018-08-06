import Command from './Command';
import { percentToInteger } from '../helpers';

export default class RooftopControlCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x25, 0x00]);
  }

  /**
   * @function control
   *
   * @property {Number} dimming (number) Dimming from 0 (0%) to 1 (100%).
   * @property {Number} position (number) Position from 0 (0%) to 1 (100%).
   */
  static control(dimming: ?number, position: ?number) {
    const dimmingBytes =
      typeof dimming !== 'number'
        ? []
        : [0x01, 0x00, 0x01, percentToInteger(dimming)];

    const positionBytes =
      typeof position !== 'number'
        ? []
        : [0x02, 0x00, 0x01, percentToInteger(position)];

    return new Command([0x00, 0x25, 0x02, ...dimmingBytes, ...positionBytes]);
  }
}
