import Command from './Command';

export default class RaceCommand {
  static getRaceState() {
    return new Command([0x00, 0x57, 0x00]);
  }
}
