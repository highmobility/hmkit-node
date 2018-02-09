import Command from './Command';
import { decimalToHexArray } from '../encoding';

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
    return new Command([0x00, 0x23, 0x03, limit * 100]);
  }

    static openChargePort() {
        return new Command([0x00, 0x23, 0x04, 0x01]);
    }

    static closeChargePort() {
        return new Command([0x00, 0x23, 0x04, 0x00]);
    }

    static setChargeMode(chargeMode: string) {
        const chargeModeOptions = {
            immediate: 0x00,
            timer_based: 0x01,
            inductive: 0x02
        };

        return new Command([0x00, 0x23, 0x05, chargeModeOptions[chargeMode]]);
    }

    static setChargeTimer(chargeTimer: string,
                          year: number,
                          month: number,
                          day: number,
                          hour: number,
                          minute: number,
                          seconds: number,
                          timeOffset: number) {
        const chargeTimerOptions = {
            preferred_start_time: 0x00,
            preferred_end_time: 0x01,
            departure_time: 0x02
        };

        return new Command([0x00, 0x23,
                            0x06,
                            0x0D,
                            0x00, 0x09,
                            chargeTimerOptions[chargeTimer],
                            year - 2000,
                            month,
                            day,
                            hour,
                            minute,
                            seconds,
                            // TODO: Needs [Int8] -> [UInt8] converter
                            ...decimalToHexArray(timeOffset),
                            ]);
    }
}
