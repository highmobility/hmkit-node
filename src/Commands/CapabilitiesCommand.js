import Command from './Command';

export default class CapabilitiesCommand {
  /**
   * @function get
   */
  static get() {
    return new Command([0x00, 0x10, 0x00]);
  }
}
