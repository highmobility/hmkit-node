import Command from './Command';

export default class DiagnosticsCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x33, 0x00]);
  }
}
