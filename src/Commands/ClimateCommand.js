import Command from './Command';
import { binaryToInt, base10ToIeee754 } from '../encoding';

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

  static startIonising() {
    return new Command([0x00, 0x24, 0x06, 0x01]);
  }

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
