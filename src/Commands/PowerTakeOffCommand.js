import Command from './Command';
import BaseCommand from './BaseCommand';

export default class PowerTakeOffCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x65, 0x00]);
  }

  /**
   * @function activate
   */
  static activate() {
    return new Command([0x00, 0x65, 0x02, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function deactivate
   */
  static deactivate() {
    return new Command([0x00, 0x65, 0x02, ...this.buildProperty(0x01, 0x00)]);
  }
}
