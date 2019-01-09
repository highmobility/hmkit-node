import Command from './Command';
import BaseCommand from './BaseCommand';
import { validate, Joi } from '../validate';

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
   * @property {string} lock (string: 'unlocked|locked') Lock or unlock gas flap
   * @property {string} position (string: 'closed|opened|intermediate') Close or open gas flap
   */
  static controlGasFlap(lock: string, position: string) {
    let lockBytes = [];
    let positionBytes = [];

    if (!!lock && lock.length > 0) {
      const lockStates = {
        unlocked: 0x00,
        locked: 0x01,
      };

      validate([
        {
          value: lock,
          name: 'Lock',
          condition: Joi.string().required().valid(Object.keys(lockStates)),
        },
      ]);


      lockBytes = this.buildProperty(0x02, lockStates[lock]);
    }

    if (!!position && position.length > 0) {
      const positions = {
        closed: 0x00,
        opened: 0x01,
        intermediate: 0x02,
      };

      validate([
        {
          value: position,
          name: 'Position',
          condition: Joi.string().required().valid(Object.keys(positions)),
        },
      ]);

      positionBytes = this.buildProperty(0x03, positions[position]);
    }

    return new Command([0x00, 0x40, 0x12, ...lockBytes, ...positionBytes]);
  }
}
