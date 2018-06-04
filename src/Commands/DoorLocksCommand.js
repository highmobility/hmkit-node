import Command from './Command';

export default class DoorLocksCommand {
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
    return new Command([0x00, 0x20, 0x02, 0x00]);
  }

  /**
   * @function lock
   */
  static lock() {
    return new Command([0x00, 0x20, 0x02, 0x01]);
  }
}
