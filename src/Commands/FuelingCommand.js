import Command from './Command';
import BaseCommand from './BaseCommand';

export default class FuelingCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x40, 0x00]);
  }

  /**
   * @function controlGasFlap
   *
   * @property {string} lock (string) Lock or unlock gas flap
   * @property {string} position (string) Close or open gas flap
   */
  static controlGasFlap(lock: string, position: string) {
    const lockStates = {
      unlocked: 0x00,
      locked: 0x01,
    };

    const positions = {
      closed: 0x00,
      opened: 0x01,
      intermediate: 0x02,
    };

    const lockBytes = this.buildProperty(0x02, [
      lockStates[lock],
    ]);

    const positionBytes = this.buildProperty(0x03, [
      positions[position]
    ]);

    return new Command([
      0x00,
      0x40,
      0x12,
      ...lockBytes,
      ...positionBytes,
    ]);
  }
}
