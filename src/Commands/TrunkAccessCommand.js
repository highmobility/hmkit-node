import Command from './Command';

export default class TrunkAccessCommand {
  static getState() {
    return new Command([0x00, 0x21, 0x00]);
  }

  static unlock() {
    return new Command([0x00, 0x21, 0x02, 0x00, 0x00]);
  }

  static open() {
    return new Command([0x00, 0x21, 0x02, 0x00, 0x01]);
  }

  static close() {
    return new Command([0x00, 0x21, 0x02, 0x00, 0x00]);
  }

  static lock() {
    return new Command([0x00, 0x21, 0x02, 0x01, 0x00]);
  }
}