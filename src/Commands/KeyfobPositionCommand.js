import Command from './Command';

export default class KeyfobPositionCommand {
  static getState() {
    return new Command([0x00, 0x48, 0x00]);
  }
}
