import Command from './Command';

export default class FuelingCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x40, 0x00]);
  }

  /**
   * @function openGasFlap
   */
  static openGasFlap() {
    return new Command([0x00, 0x40, 0x02]);
  }
}
