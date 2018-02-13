import Command from './Command';

export default class ParkingBrakeCommand {
  static getState() {
    return new Command([0x00, 0x58, 0x00]);
  }

  static activate() {
    return new Command([0x00, 0x58, 0x02, 0x01]);
  }

  static inactivate() {
    return new Command([0x00, 0x58, 0x02, 0x00]);
  }
}
