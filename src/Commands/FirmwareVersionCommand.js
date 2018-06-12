import Command from './Command';

export default class FirmwareVersionCommand {
  /**
   * @function getVersion
   */
  static getVersion() {
    return new Command([0x00, 0x03, 0x00]);
  }
}
