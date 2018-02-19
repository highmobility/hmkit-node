import Command from './Command';

export default class RaceCommand {
  static getState() {
    return new Command([0x00, 0x57, 0x00]);
  }
}
