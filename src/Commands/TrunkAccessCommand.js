import Command from './Command';

export default class TrunkAccessCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x21, 0x00]);
  }

  /**
   * @function unlock
   */
  static unlock() {
    return new Command([0x00, 0x21, 0x02, 0x01, 0x00, 0x01, 0x00]);
  }

  /**
   * @function open
   */
  static open() {
    return new Command([
      0x00,
      0x21,
      0x02,
      0x01,
      0x00,
      0x01,
      0x00,
      0x02,
      0x00,
      0x01,
      0x01,
    ]);
  }

  /**
   * @function close
   */
  static close() {
    return new Command([0x00, 0x21, 0x02, 0x02, 0x00, 0x01, 0x00]);
  }

  /**
   * @function lock
   */
  static lock() {
    return new Command([0x00, 0x21, 0x02, 0x01, 0x00, 0x01, 0x01]);
  }
}
