import Command from './Command';

export default class VehicleTimeCommand {
  static getVehicleTime() {
    return new Command([0x00, 0x50, 0x00]);
  }
}
