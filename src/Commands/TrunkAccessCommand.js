import Command from './Command';
import BaseCommand from './BaseCommand';

export default class TrunkAccessCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x21, 0x00]);
  }

  /**
   * @function unlock
   */
  static unlock() {
    return new Command([0x00, 0x21, 0x12, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function lock
   */
  static lock() {
    return new Command([0x00, 0x21, 0x12, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function open
   */
  static open() {
    return new Command([0x00, 0x21, 0x12, ...this.buildProperty(0x02, 0x01)]);
  }

  /**
   * @function close
   */
  static close() {
    return new Command([0x00, 0x21, 0x12, ...this.buildProperty(0x02, 0x00)]);
  }

  /**
   * @function controlTrunk
   *
   * @property {Boolean} isLocked (boolean) Lock or unlock trunk
   * @property {Boolean} isOpen (boolean) Open or close trunk
   */
  static controlTrunk(isLocked: boolean, isOpen: boolean) {
    return new Command([
      0x00,
      0x21,
      0x12,
      ...this.buildProperty(0x01, isLocked ? 0x01 : 0x00),
      ...this.buildProperty(0x02, isOpen ? 0x01 : 0x00),
    ]);
  }
}
