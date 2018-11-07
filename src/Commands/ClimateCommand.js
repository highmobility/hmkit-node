import Command from './Command';
import BaseCommand from './BaseCommand';
import { base10ToIeee754 } from '../encoding';
import { validate, Joi } from '../validate';

export default class ClimateCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x24, 0x00]);
  }

  /**
   * @function setWeekdayStartingTimes
   *
   * @property {Array} weekdayStartingTimes (array) HVAC weekway starting times ([{ weekday: (string: 'monday|tuesday|wednesday|thursday|friday|satuday|sunday|automatic'), hour: (number), minute: (number) }])
   */
  static setWeekdayStartingTimes(weekdayStartingTimes: Array<Object>) {
    const weekdayStartingTimesBytes = weekdayStartingTimes.reduce(
      (weekdayBytes, { weekday, hour, minute }) =>
        weekdayBytes.concat(
          this.buildProperty(0x01, [this.getWeekdayByte(weekday), hour, minute])
        ),
      []
    );

    return new Command([0x00, 0x24, 0x12, ...weekdayStartingTimesBytes]);
  }

  /**
   * @function startHvac
   */
  static startHvac() {
    return new Command([0x00, 0x24, 0x13, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function stopHvac
   */
  static stopHvac() {
    return new Command([0x00, 0x24, 0x13, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function startDefogging
   */
  static startDefogging() {
    return new Command([0x00, 0x24, 0x14, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function stopDefogging
   */
  static stopDefogging() {
    return new Command([0x00, 0x24, 0x14, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function startDefrosting
   */
  static startDefrosting() {
    return new Command([0x00, 0x24, 0x15, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function stopDefrosting
   */
  static stopDefrosting() {
    return new Command([0x00, 0x24, 0x15, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function startIonising
   */
  static startIonising() {
    return new Command([0x00, 0x24, 0x16, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function stopIonising
   */
  static stopIonising() {
    return new Command([0x00, 0x24, 0x16, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function setTemperatureSettings
   *
   * @property {Number} driverTemperatureSetting (number) Driver temperature setting in ‎°C
   * @property {Number} passengerTemperatureSetting (number) Passenger temperature setting in ‎°C
   * @property {Number} rearTemperatureSetting (number) Rear temperature setting in ‎°C
   */
  static setTemperatureSettings(
    driverTemperatureSetting: Number,
    passengerTemperatureSetting: Number,
    rearTemperatureSetting: Number
  ) {
    validate([
      {
        value: driverTemperatureSetting,
        name: 'Driver temperature setting',
        condition: Joi.number().required(),
      },
      {
        value: passengerTemperatureSetting,
        name: 'Passenger temperature setting',
        condition: Joi.number().required(),
      },
      {
        value: rearTemperatureSetting,
        name: 'Rear temperature setting',
        condition: Joi.number().required(),
      },
    ]);

    return new Command([
      0x00,
      0x24,
      0x17,
      ...this.buildProperty(0x01, base10ToIeee754(driverTemperatureSetting)),
      ...this.buildProperty(0x02, base10ToIeee754(passengerTemperatureSetting)),
      ...this.buildProperty(0x03, base10ToIeee754(rearTemperatureSetting)),
    ]);
  }

  static getWeekdayByte(weekday: string) {
    switch (weekday) {
      case 'tuesday':
        return 0x01;
      case 'wednesday':
        return 0x02;
      case 'thursday':
        return 0x03;
      case 'friday':
        return 0x04;
      case 'satuday':
        return 0x05;
      case 'sunday':
        return 0x06;
      case 'automatic':
        return 0x07;
      default:
        return 0x00;
    }
  }
}
