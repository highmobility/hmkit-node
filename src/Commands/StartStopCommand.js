import Command from './Command';
import BaseCommand from './BaseCommand';

export default class StartStopCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x63, 0x00]);
  }

  /**
   * @function activate
   */
  static activate() {
    return new Command([0x00, 0x63, 0x12, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function deactivate
   */
  static deactivate() {
    return new Command([0x00, 0x63, 0x12, ...this.buildProperty(0x01, 0x00)]);
  }
}
