import Command from './Command';

export default class LightConditionsCommand {
  static getConditions() {
    return new Command([0x00, 0x54, 0x00]);
  }
}
