import Command from './Command';

export default class WeatherConditionsCommand {
  /**
   * @function getConditions
   */
  static getConditions() {
    return new Command([0x00, 0x55, 0x00]);
  }
}
