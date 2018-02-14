import Command from './Command';

export default class VehicleTimeCommand {
  static getTime() {
    return new Command([0x00, 0x50, 0x00]);
  }
}
