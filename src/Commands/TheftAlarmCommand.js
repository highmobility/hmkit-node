import Command from './Command';

export default class TheftAlarmCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x46, 0x00]);
  }

  /**
   * @function unarm
   */
  static unarm() {
    return new Command([0x00, 0x46, 0x02, 0x00]);
  }

  /**
   * @function arm
   */
  static arm() {
    return new Command([0x00, 0x46, 0x02, 0x01]);
  }

  /**
   * @function trigger
   */
  static trigger() {
    return new Command([0x00, 0x46, 0x02, 0x02]);
  }
}
