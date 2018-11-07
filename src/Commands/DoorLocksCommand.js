import Command from './Command';
import BaseCommand from './BaseCommand';

export default class DoorLocksCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x20, 0x00]);
  }

  /**
   * @function unlock
   */
  static unlock() {
    return new Command([0x00, 0x20, 0x12, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function lock
   */
  static lock() {
    return new Command([0x00, 0x20, 0x12, ...this.buildProperty(0x01, 0x01)]);
  }
}
