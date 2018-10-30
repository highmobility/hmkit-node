import Command from './Command';
import BaseCommand from './BaseCommand';

export default class EngineCommand extends BaseCommand {
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
    return new Command([0x00, 0x35, 0x12, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function turnOn
   */
  static turnOn() {
    return new Command([0x00, 0x35, 0x12, ...this.buildProperty(0x01, 0x01)]);
  }
}
