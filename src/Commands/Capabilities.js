import Command from 'src/Commands/Command';

export default class Capabilities {
  static get() {
    return new Command([0x00, 0x10, 0x00]);
  }
}
