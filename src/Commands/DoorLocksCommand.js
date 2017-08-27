import Command from './Command';

export default class DoorLocksCommand {
  static getLockState() {
    return new Command([0x00, 0x20, 0x00]);
  }

  static unlock() {
    return new Command([0x00, 0x20, 0x02, 0x00]);
  }

  static lock() {
    return new Command([0x00, 0x20, 0x02, 0x01]);
  }
}
