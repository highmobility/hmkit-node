import Command from './Command';

export default class ValetModeCommand {
  static getState() {
    return new Command([0x00, 0x28, 0x00]);
  }

  static activate() {
    return new Command([0x00, 0x28, 0x02, 0x01]);
  }

  static deactivate() {
    return new Command([0x00, 0x28, 0x02, 0x00]);
  }
}
