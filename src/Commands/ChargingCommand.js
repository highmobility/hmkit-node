import Command from './Command';
import { dateToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class ChargingCommand {
  static getChargeState() {
    return new Command([0x00, 0x23, 0x00]);
  }

  static startCharging() {
    return new Command([0x00, 0x23, 0x02, 0x01]);
  }

  static stopCharging() {
    return new Command([0x00, 0x23, 0x02, 0x00]);
  }

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

  static openChargePort() {
    return new Command([0x00, 0x23, 0x04, 0x01]);
  }

  static closeChargePort() {
    return new Command([0x00, 0x23, 0x04, 0x00]);
  }

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
