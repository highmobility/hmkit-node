import Command from './Command';

export default class VehicleTimeCommand {
  /**
   * @function getTime
   */
  static getTime() {
    return new Command([0x00, 0x50, 0x00]);
  }
}
