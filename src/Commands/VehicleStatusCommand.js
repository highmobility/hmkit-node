import Command from './Command';

export default class VehicleStatusCommand {
  /**
   * @function get
   */
  static get() {
    return new Command([0x00, 0x11, 0x00]);
  }
}
