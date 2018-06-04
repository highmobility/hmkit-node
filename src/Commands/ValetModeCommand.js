import Command from './Command';

export default class ValetModeCommand {
  /**
   * @function getMode
   */
  static getMode() {
    return new Command([0x00, 0x28, 0x00]);
  }

  /**
   * @function activate
   */
  static activate() {
    return new Command([0x00, 0x28, 0x02, 0x01]);
  }

  /**
   * @function deactivate
   */
  static deactivate() {
    return new Command([0x00, 0x28, 0x02, 0x00]);
  }
}
