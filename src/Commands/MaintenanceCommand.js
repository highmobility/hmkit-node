import Command from './Command';

export default class MaintenanceCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x34, 0x00]);
  }
}
