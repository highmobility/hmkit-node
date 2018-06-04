import Command from './Command';

export default class WakeUpCommand {
  /**
   * @function wakeUp
   */
  static wakeUp() {
    return new Command([0x00, 0x22, 0x02]);
  }
}
