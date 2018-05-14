import Command from './Command';

export default class DashboardLightsCommand {
  static getState() {
    return new Command([0x00, 0x61, 0x00]);
  }
}
