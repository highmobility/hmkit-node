import Command from './Command';

export default class EngineCommand {
  /**
   * @function getIgnitionState
   */
  static getIgnitionState() {
    return new Command([0x00, 0x35, 0x00]);
  }

  /**
   * @function turnOff
   */
  static turnOff() {
    return new Command([0x00, 0x35, 0x02, 0x00]);
  }

  /**
   * @function turnOn
   */
  static turnOn() {
    return new Command([0x00, 0x35, 0x02, 0x01]);
  }
}
