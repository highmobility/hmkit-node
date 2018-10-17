import Command from './Command';
import BaseCommand from './BaseCommand';
import { dateToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class ChargingCommand extends BaseCommand {
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
    return new Command([0x00, 0x23, 0x12, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function stopCharging
   */
  static stopCharging() {
    return new Command([0x00, 0x23, 0x12, ...this.buildProperty(0x01, 0x00)]);
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

    return new Command([0x00, 0x23, 0x13, ...this.buildProperty(0x01, limit)]);
  }

  /**
   * @function openChargePort
   */
  static openChargePort() {
    return new Command([0x00, 0x23, 0x14, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function closeChargePort
   */
  static closeChargePort() {
    return new Command([0x00, 0x23, 0x14, ...this.buildProperty(0x01, 0x00)]);
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

    return new Command([
      0x00,
      0x23,
      0x15,
      ...this.buildProperty(0x01, chargeModeOptions[chargeMode]),
    ]);
  }

  /**
   * @function setChargeTimer
   *
   * @property {String} chargeTimer (string: 'preferred_start_time', 'preferred_end_time', 'departure_time') Charge timer
   * @property {Date} time (date) Time
   */
  static setChargeTimers(
    chargeTimers: Array<{ timerType: string, date: Date }>
  ) {
    const chargeTimerOptions = {
      preferred_start_time: 0x00,
      preferred_end_time: 0x01,
      departure_time: 0x02,
    };

    const chargeTimerProperties = chargeTimers.reduce(
      (allTimers, { timerType, date }) =>
        allTimers.concat(
          this.buildProperty(0x0d, [
            chargeTimerOptions[timerType],
            ...dateToBytes(date),
          ])
        ),
      []
    );

    return new Command([0x00, 0x23, 0x16, ...chargeTimerProperties]);
  }
}
