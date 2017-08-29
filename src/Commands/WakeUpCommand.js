import Command from './Command';

export default class WakeUpCommand {
  static wakeUp() {
    return new Command([0x00, 0x22, 0x02]);
  }
}
