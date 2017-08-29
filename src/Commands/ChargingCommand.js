import Command from './Command';

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
}
