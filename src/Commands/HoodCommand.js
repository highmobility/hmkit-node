import Command from './Command';
import BaseCommand from './BaseCommand';

export default class HoodCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x67, 0x00]);
  }
}
