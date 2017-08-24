import Command from './Command';

export default class DiagnosticsCommand {
  static getState() {
    return new Command([0x00, 0x33, 0x00]);
  }
}
