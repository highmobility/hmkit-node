import Command from './Command';

export default class FuelingCommand {
  static getState() {
    return new Command([0x00, 0x40, 0x00]);
  }

  static openGasFlap() {
    return new Command([0x00, 0x40, 0x02]);
  }
}
