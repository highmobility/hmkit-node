import Command from './Command';

export default class StartStopCommand {
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
    return new Command([0x00, 0x63, 0x02, 0x01, 0x00, 0x01, 0x01]);
  }

  /**
   * @function deactivate
   */
  static deactivate() {
    return new Command([0x00, 0x63, 0x02, 0x01, 0x00, 0x01, 0x00]);
  }
}
