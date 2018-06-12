import Command from './Command';
import { binaryToInt, base10ToIeee754 } from '../encoding';

export default class ClimateCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x24, 0x00]);
  }

  /**
   * @function setProfile
   *
   * @property {Object} mondays (Object `{hour: (integer), minute: (integer)}` | false) Auto HVAC Monday setting
   * @property {Object} tuesdays (Object `{hour: (integer), minute: (integer)}` | false) Auto HVAC Tuesday setting
   * @property {Object} wednesdays (Object `{hour: (integer), minute: (integer)}` | false) Auto HVAC Wednesday setting
   * @property {Object} thursdays (Object `{hour: (integer), minute: (integer)}` | false) Auto HVAC Thursday setting
   * @property {Object} fridays (Object `{hour: (integer), minute: (integer)}` | false) Auto HVAC Friday setting
   * @property {Object} saturdays (Object `{hour: (integer), minute: (integer)}` | false) Auto HVAC Saturday setting
   * @property {Object} sundays (Object `{hour: (integer), minute: (integer)}` | false) Auto HVAC Sunday setting
   * @property {Boolean} constant (boolean) Auto HVAC Constant setting
   * @property {Number} driverTemperatureSetting (number) Driver temperature setting in ‎°C
   * @property {Number} passengerTemperatureSetting (number) Passenger temperature setting in ‎°C
   */
  static setProfile(
    mondays,
    tuesdays,
    wednesdays,
    thursdays,
    fridays,
    saturdays,
    sundays,
    constant,
    driverTemperatureSetting,
    passengerTemperatureSetting
  ) {
    return new Command([
      0x00,
      0x24,
      0x02,
      0x01,
      0x00,
      0x0f,
      this.getHvacActivatedOnDaysByte(
        constant,
        sundays,
        saturdays,
        fridays,
        thursdays,
        wednesdays,
        tuesdays,
        mondays
      ),
      ...this.getHvacDayBytes(mondays),
      ...this.getHvacDayBytes(tuesdays),
      ...this.getHvacDayBytes(wednesdays),
      ...this.getHvacDayBytes(thursdays),
      ...this.getHvacDayBytes(fridays),
      ...this.getHvacDayBytes(saturdays),
      ...this.getHvacDayBytes(sundays),
      0x02,
      0x00,
      0x04,
      ...base10ToIeee754(driverTemperatureSetting),
      0x03,
      0x00,
      0x04,
      ...base10ToIeee754(passengerTemperatureSetting),
    ]);
  }

  /**
   * @function startHvac
   */
  static startHvac() {
    return new Command([0x00, 0x24, 0x03, 0x01]);
  }

  /**
   * @function stopHvac
   */
  static stopHvac() {
    return new Command([0x00, 0x24, 0x03, 0x00]);
  }

  /**
   * @function startDefogging
   */
  static startDefogging() {
    return new Command([0x00, 0x24, 0x04, 0x01]);
  }

  /**
   * @function stopDefogging
   */
  static stopDefogging() {
    return new Command([0x00, 0x24, 0x04, 0x00]);
  }

  /**
   * @function startDefrosting
   */
  static startDefrosting() {
    return new Command([0x00, 0x24, 0x05, 0x01]);
  }

  /**
   * @function stopDefrosting
   */
  static stopDefrosting() {
    return new Command([0x00, 0x24, 0x05, 0x00]);
  }

  /**
   * @function startIonising
   */
  static startIonising() {
    return new Command([0x00, 0x24, 0x06, 0x01]);
  }

  /**
   * @function stopIonising
   */
  static stopIonising() {
    return new Command([0x00, 0x24, 0x06, 0x00]);
  }

  static getHvacActivatedOnDaysByte(...args) {
    return binaryToInt(
      [...args].reduce((memory, day) => memory + String(!!day ? 1 : 0), '')
    );
  }

  static getHvacDayBytes(day) {
    if (day) {
      return [day.hour, day.minute];
    }
    return [0x00, 0x00];
  }
}
