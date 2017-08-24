import Command from './Command';

export default class VehicleLocationCommand {
  static get() {
    return new Command([0x00, 0x30, 0x00]);
  }
}
