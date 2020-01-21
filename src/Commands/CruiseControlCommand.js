import Command from './Command';
import BaseCommand from './BaseCommand';
import { validate, Joi } from '../validate';

export default class CruiseControlCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x62, 0x00]);
  }

  /**
   * @function activateCruiseControl
   *
   * @property {Number} targetSpeed (number) The target speed in km/h
   */
  static activateCruiseControl(targetSpeed: ?number) {
    validate([
      {
        value: targetSpeed,
        name: 'Target speed',
        condition: Joi.number(),
      },
    ]);

    const targetSpeedBytes =
      targetSpeed !== null && targetSpeed !== undefined
        ? this.buildProperty(0x02, targetSpeed)
        : [];

    return new Command([
      0x00,
      0x62,
      0x12,
      ...this.buildProperty(0x01, 0x01),
      ...targetSpeedBytes,
    ]);
  }

  /**
   * @function deactivateCruiseControl
   */
  static deactivateCruiseControl() {
    return new Command([0x00, 0x62, 0x12, ...this.buildProperty(0x01, 0x00)]);
  }
}