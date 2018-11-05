import Command from './Command';
import BaseCommand from './BaseCommand';
import { validate, Joi } from '../validate';

export default class ChassisSettingsCommand extends BaseCommand {
  /**
   * @function getSettings
   */
  static getSettings() {
    return new Command([0x00, 0x53, 0x00]);
  }

  /**
   * @function setDrivingMode
   *
   * @property {String} drivingMode (string: 'regular', 'eco', 'sport', 'sport_plus', 'eco_plus') Driving mode
   */
  static setDrivingMode(drivingMode) {
    validate([
      {
        value: drivingMode,
        name: 'Driving mode',
        condition: Joi.string()
          .valid('regular', 'eco', 'sport', 'sport_plus', 'eco_plus')
          .required(),
      },
    ]);

    const drivingModeOptions = {
      regular: 0x00,
      eco: 0x01,
      sport: 0x02,
      sport_plus: 0x03,
      eco_plus: 0x04,
    };

    return new Command([
      0x00,
      0x53,
      0x12,
      ...this.buildProperty(0x01, drivingModeOptions[drivingMode]),
    ]);
  }

  /**
   * @function startSportChrono
   */
  static startSportChrono() {
    return new Command([0x00, 0x53, 0x13, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function stopSportChrono
   */
  static stopSportChrono() {
    return new Command([0x00, 0x53, 0x13, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function resetSportChrono
   */
  static resetSportChrono() {
    return new Command([0x00, 0x53, 0x13, ...this.buildProperty(0x01, 0x02)]);
  }

  /**
   * @function setFrontAxleSpringRate
   *
   * @property {Number} rate (number) Spring rate
   */
  static setFrontAxleSpringRate(rate: number) {
    validate([
      {
        value: rate,
        name: 'Rate',
        condition: Joi.number().required(),
      },
    ]);

    const rateByte = ((rate << 24) >> 24) & 0xff;

    return new Command([
      0x00,
      0x53,
      0x14,
      ...this.buildProperty(0x01, [0x00, rateByte]),
    ]);
  }

  /**
   * @function setRearAxleSpringRate
   *
   * @property {Number} rate (number) Spring rate
   */
  static setRearAxleSpringRate(rate: number) {
    validate([
      {
        value: rate,
        name: 'Rate',
        condition: Joi.number().required(),
      },
    ]);

    const rateByte = ((rate << 24) >> 24) & 0xff;

    return new Command([
      0x00,
      0x53,
      0x14,
      ...this.buildProperty(0x01, [0x01, rateByte]),
    ]);
  }

  /**
   * @function setChassisPosition
   *
   * @property {Number} position (number) Chassis position
   */
  static setChassisPosition(position: number) {
    validate([
      {
        value: position,
        name: 'Position',
        condition: Joi.number().required(),
      },
    ]);

    const positionByte = ((position << 24) >> 24) & 0xff;

    return new Command([
      0x00,
      0x53,
      0x15,
      ...this.buildProperty(0x01, positionByte),
    ]);
  }
}
