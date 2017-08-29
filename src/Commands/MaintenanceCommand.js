import Command from './Command';

export default class MaintenanceCommand {
  static getState() {
    return new Command([0x00, 0x34, 0x00]);
  }
}
