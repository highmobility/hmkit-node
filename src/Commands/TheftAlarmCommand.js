import Command from './Command';
import BaseCommand from './BaseCommand';

export default class TheftAlarmCommand extends BaseCommand {
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
    return new Command([0x00, 0x46, 0x12, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function arm
   */
  static arm() {
    return new Command([0x00, 0x46, 0x12, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function trigger
   */
  static trigger() {
    return new Command([0x00, 0x46, 0x12, ...this.buildProperty(0x01, 0x02)]);
  }
}
