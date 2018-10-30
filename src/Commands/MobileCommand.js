import Command from './Command';
import BaseCommand from './BaseCommand';

export default class MobileCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x66, 0x00]);
  }
}
