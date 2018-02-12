import Command from './Command';

export default class KeyfobPositionCommand {
  static getKeyfobPosition() {
    return new Command([0x00, 0x48, 0x00]);
  }
}
