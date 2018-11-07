import Command from './Command';

export default class UsageCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x68, 0x00]);
  }
}
