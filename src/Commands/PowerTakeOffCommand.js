import Command from './Command';

export default class PowerTakeOffCommand {
  static getState() {
    return new Command([0x00, 0x65, 0x00]);
  }

  static activate() {
    return new Command([0x00, 0x65, 0x02, 0x01, 0x00, 0x01, 0x01]);
  }

  static deactivate() {
    return new Command([0x00, 0x65, 0x02, 0x01, 0x00, 0x01, 0x00]);
  }
}
