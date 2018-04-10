import Command from './Command';
import { validate, Joi } from '../validate';

export default class ChassisSettingsCommand {
  static getSettings() {
    return new Command([0x00, 0x53, 0x00]);
  }

  static setDrivingMode(drivingMode) {
    validate([
      {
        value: drivingMode,
        name: 'Driving mode',
        condition: Joi.string()
          .valid('regular', 'eco', 'sport', 'sport_plus')
          .required(),
      },
    ]);

    const drivingModeOptions = {
      regular: 0x00,
      eco: 0x01,
      sport: 0x02,
      sport_plus: 0x03,
    };

    return new Command([0x00, 0x53, 0x02, drivingModeOptions[drivingMode]]);
  }

  static startSportChrono() {
    return new Command([0x00, 0x53, 0x03, 0x00]);
  }

  static stopSportChrono() {
    return new Command([0x00, 0x53, 0x03, 0x01]);
  }

  static resetSportChrono() {
    return new Command([0x00, 0x53, 0x03, 0x02]);
  }

  static setFrontAxleSpringRate(rate: number) {
    const rateByte = ((rate << 24) >> 24) & 0xff;

    return new Command([0x00, 0x53, 0x04, 0x00, rateByte]);
  }

  static setRearAxleSpringRate(rate: number) {
    const rateByte = ((rate << 24) >> 24) & 0xff;

    return new Command([0x00, 0x53, 0x04, 0x01, rateByte]);
  }

  static setChassisPosition(position: number) {
    const positionByte = ((position << 24) >> 24) & 0xff;

    return new Command([0x00, 0x53, 0x05, positionByte]);
  }
}
