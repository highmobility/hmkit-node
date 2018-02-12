import Command from './Command';

export default class SeatsCommand {
  static getSeatsState() {
    return new Command([0x00, 0x56, 0x00]);
  }
}
