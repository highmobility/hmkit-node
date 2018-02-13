import Command from './Command';

export default class WeatherConditionsCommand {
  static getConditions() {
    return new Command([0x00, 0x55, 0x00]);
  }
}
