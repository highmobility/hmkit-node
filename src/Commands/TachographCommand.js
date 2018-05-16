import Command from './Command';

export default class TachographCommand {
  static getState() {
    return new Command([0x00, 0x64, 0x00]);
  }
}
