import Command from './Command';

export default class FuelingCommand {
  static openGasFlap() {
    return new Command([0x00, 0x40, 0x02]);
  }
}
