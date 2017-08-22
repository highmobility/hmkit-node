import Command from 'src/Commands/Command';

export default class VehicleStatus {
  static get() {
    return new Command([0x00, 0x11, 0x00]);
  }
}
