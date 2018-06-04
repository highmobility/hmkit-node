import Command from './Command';

export default class TachographCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x64, 0x00]);
  }
}
