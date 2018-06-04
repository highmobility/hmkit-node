import Command from './Command';

export default class OffroadCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x52, 0x00]);
  }
}
