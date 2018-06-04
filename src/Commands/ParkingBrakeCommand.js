import Command from './Command';

export default class ParkingBrakeCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x58, 0x00]);
  }

  /**
   * @function activate
   */
  static activate() {
    return new Command([0x00, 0x58, 0x02, 0x01]);
  }

  /**
   * @function inactivate
   */
  static inactivate() {
    return new Command([0x00, 0x58, 0x02, 0x00]);
  }
}
