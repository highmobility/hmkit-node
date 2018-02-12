import Command from './Command';

export default class ParkingBrakeCommand {
  static getParkingBrakeState() {
    return new Command([0x00, 0x58, 0x00]);
  }

  static activateParkingBrake() {
    return new Command([0x00, 0x58, 0x02, 0x01]);
  }

  static inactivateParkingBrake() {
    return new Command([0x00, 0x58, 0x02, 0x00]);
  }
}
