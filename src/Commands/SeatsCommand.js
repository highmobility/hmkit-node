import Command from './Command';

export default class SeatsCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x56, 0x00]);
  }
}
