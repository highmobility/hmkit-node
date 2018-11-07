import Command from './Command';
import BaseCommand from './BaseCommand';

export default class ParkingBrakeCommand extends BaseCommand {
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
    return new Command([0x00, 0x58, 0x12, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function inactivate
   */
  static inactivate() {
    return new Command([0x00, 0x58, 0x12, ...this.buildProperty(0x01, 0x00)]);
  }
}
