import Command from './Command';
import { dateToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class ChargingCommand {
  /**
   * @function getChargeState
   */
  static getChargeState() {
    return new Command([0x00, 0x23, 0x00]);
  }

  /**
   * @function startCharging
   */
  static startCharging() {
    return new Command([0x00, 0x23, 0x02, 0x01]);
  }

  /**
   * @function stopCharging
   */
  static stopCharging() {
    return new Command([0x00, 0x23, 0x02, 0x00]);
  }

  /**
   * @function setChargeLimit
   *
   * @property {Number} limit (number) Limit from 0 (0%) to 1 (100%).
   */
  static setChargeLimit(limit: number) {
    validate([
      {
        value: limit,
        name: 'Limit',
        condition: Joi.number()
          .min(0)
          .max(100)
          .required(),
      },
    ]);

    return new Command([0x00, 0x23, 0x03, limit]);
  }

  /**
   * @function openChargePort
   */
  static openChargePort() {
    return new Command([0x00, 0x23, 0x04, 0x01]);
  }

  /**
   * @function closeChargePort
   */
  static closeChargePort() {
    return new Command([0x00, 0x23, 0x04, 0x00]);
  }

  /**
   * @function setChargeMode
   *
   * @property {String} chargeMode (string: 'immediate', 'timer_based') Charge mode
   */
  static setChargeMode(chargeMode: string) {
    validate([
      {
        value: chargeMode,
        name: 'Charge mode',
        condition: Joi.string()
          .valid('immediate', 'timer_based')
          .required(),
      },
    ]);

    const chargeModeOptions = {
      immediate: 0x00,
      timer_based: 0x01,
      inductive: 0x02,
    };

    return new Command([0x00, 0x23, 0x05, chargeModeOptions[chargeMode]]);
  }

  /**
   * @function setChargeTimer
   *
   * @property {String} chargeTimer (string: 'preferred_start_time', 'preferred_end_time', 'departure_time') Charge timer
   * @property {Date} time (date) Time
   */
  static setChargeTimer(chargeTimer: string, time: Date) {
    const chargeTimerOptions = {
      preferred_start_time: 0x00,
      preferred_end_time: 0x01,
      departure_time: 0x02,
    };

    return new Command([
      0x00,
      0x23,
      0x06,
      0x0d,
      0x00,
      0x09,
      chargeTimerOptions[chargeTimer],
      ...dateToBytes(time),
    ]);
  }
}
