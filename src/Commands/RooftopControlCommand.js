import Command from './Command';
import BaseCommand from './BaseCommand';
import { percentToInteger } from '../helpers';
import { validate, Joi } from '../validate';

export default class RooftopControlCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x25, 0x00]);
  }

  /**
   * @function control
   *
   * @property {Number} dimming (number) Dimming from 0 (0%) to 1 (100%).
   * @property {Number} position (number) Position from 0 (0%) to 1 (100%).
   * @property {String} convertibleRoof (string 'closed|open|emergency_locked|closed_secured|open_secured|hard_top_mounted|intermediate_position|loading_position|loading_position_immediate') Convertible roof state
   * @property {String} sunroofTilt (string 'closed|tilted|half_tilted') Sunroof tilt state
   * @property {String} sunroofState (string 'closed|open|intermediate') Sunroof state
   */
  static control(
    dimming: ?number,
    position: ?number,
    convertibleRoof: ?string,
    sunroofTilt: ?string,
    sunroofState: ?string
  ) {
    const dimmingBytes =
      typeof dimming !== 'number'
        ? []
        : [0x01, 0x00, 0x01, percentToInteger(dimming)];

    const positionBytes =
      typeof position !== 'number'
        ? []
        : [0x02, 0x00, 0x01, percentToInteger(position)];

    let convertibleRoofBytes = [];
    let sunroofTiltBytes = [];
    let sunroofStateBytes = [];

    if (!!convertibleRoof) {
      const convertibleRoofOptions = {
        closed: 0x00,
        open: 0x01,
        emergency_locked: 0x02,
        closed_secured: 0x03,
        open_secured: 0x04,
        hard_top_mounted: 0x05,
        intermediate_position: 0x06,
        loading_position: 0x07,
        loading_position_immediate: 0x08,
      };

      validate([
        {
          value: convertibleRoof,
          name: 'Convertible roof',
          condition: Joi.string().valid(...Object.keys(convertibleRoofOptions)),
        },
      ]);

      convertibleRoofBytes = this.buildProperty(
        0x03,
        convertibleRoofOptions[convertibleRoof]
      );
    }

    if (!!sunroofTilt) {
      const sunroofTiltOptions = {
        closed: 0x00,
        tilted: 0x01,
        half_tilted: 0x02,
      };

      validate([
        {
          value: sunroofTilt,
          name: 'Sunroof tilt',
          condition: Joi.string().valid(...Object.keys(sunroofTiltOptions)),
        },
      ]);

      sunroofTiltBytes = this.buildProperty(
        0x04,
        sunroofTiltOptions[sunroofTilt]
      );
    }

    if (!!sunroofState) {
      const sunroofStateOptions = {
        closed: 0x00,
        open: 0x01,
        intermediate: 0x02,
      };

      validate([
        {
          value: sunroofState,
          name: 'Sunroof state',
          condition: Joi.string().valid(...Object.keys(sunroofStateOptions)),
        },
      ]);

      sunroofStateBytes = this.buildProperty(
        0x05,
        sunroofStateOptions[sunroofState]
      );
    }

    return new Command([
      0x00,
      0x25,
      0x12,
      ...dimmingBytes,
      ...positionBytes,
      ...convertibleRoofBytes,
      ...sunroofTiltBytes,
      ...sunroofStateBytes,
    ]);
  }
}
