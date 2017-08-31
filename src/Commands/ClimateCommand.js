import Command from './Command';
import { binaryToInt, intToIeee754 } from '../encoding';

export default class ClimateCommand {
  static getState() {
    return new Command([0x00, 0x24, 0x00]);
  }

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
      this.getHvacActivatedOnDaysByte(
        mondays,
        tuesdays,
        wednesdays,
        thursdays,
        fridays,
        saturdays,
        sundays,
        constant
      ),
      ...this.getHvacDayBytes(mondays),
      ...this.getHvacDayBytes(tuesdays),
      ...this.getHvacDayBytes(wednesdays),
      ...this.getHvacDayBytes(thursdays),
      ...this.getHvacDayBytes(fridays),
      ...this.getHvacDayBytes(saturdays),
      ...this.getHvacDayBytes(sundays),
      ...intToIeee754(driverTemperatureSetting),
      ...intToIeee754(passengerTemperatureSetting),
    ]);
  }

  static getHvacActivatedOnDaysByte(...args) {
    return binaryToInt(
      [...args].reduce((memory, day) => memory + String(!!day ? 1 : 0), '')
    );
  }

  static getHvacDayBytes(day) {
    if (day) {
      return [day.hours, day.minutes];
    }
    return [0x00, 0x00];
  }

  static startHvac() {
    return new Command([0x00, 0x24, 0x03, 0x01]);
  }

  static stopHvac() {
    return new Command([0x00, 0x24, 0x03, 0x00]);
  }

  static startDefogging() {
    return new Command([0x00, 0x24, 0x04, 0x01]);
  }

  static stopDefogging() {
    return new Command([0x00, 0x24, 0x04, 0x00]);
  }

  static startDefrosting() {
    return new Command([0x00, 0x24, 0x05, 0x01]);
  }

  static stopDefrosting() {
    return new Command([0x00, 0x24, 0x05, 0x00]);
  }
}
