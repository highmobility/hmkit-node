import Command from './Command';
import BaseCommand from './BaseCommand';
import { validate, Joi } from '../validate';

export default class WindscreenCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x42, 0x00]);
  }

  /**
   *
   * @function setDamage
   *
   * @property {String} damage (string 'impact_but_no_damage_detected, damage_smaller_than_1_inch, damage_larger_than_1_inch, no_damage') Windscreen Damage
   * @property {Number} damageZoneRow (number) Limit from 1 to 16, representing the horizontal position of the damage
   * @property {Number} damageZoneColumn (number) Limit from 1 to 16, representing the vertical position of the damage
   */
  static setDamage(
    damage: string,
    damageZoneRow: number,
    damageZoneColumn: number
  ) {
    validate([
      {
        value: damage,
        name: 'Damage',
        condition: Joi.string().required(),
      },
      {
        value: damageZoneRow,
        name: 'Damage zone row',
        condition: Joi.number().required(),
      },
      {
        value: damageZoneColumn,
        name: 'Damage zone column',
        condition: Joi.number().required(),
      },
    ]);

    return new Command([
      0x00,
      0x42,
      0x12,
      ...this.buildProperty(0x01, this.getDamageByte(damage)),
      ...this.buildProperty(
        0x02,
        ((damageZoneRow & 0x0f) << 4) + (damageZoneColumn & 0x0f)
      ),
    ]);
  }

  /**
   * @function setReplacement
   *
   * @property {String} needsReplacement (string 'no_replacement_needed, replacement_needed, unknown') Windscreen damage needs replacement
   */
  static setReplacement(needsReplacement: string) {
    validate([
      {
        value: needsReplacement,
        name: 'Needs replacement',
        condition: Joi.string().required(),
      },
    ]);

    return new Command([
      0x00,
      0x42,
      0x13,
      ...this.buildProperty(
        0x01,
        this.getNeedReplacementByte(needsReplacement)
      ),
    ]);
  }

  /**
   * @function controlWipers
   *
   * @property {String} wipersState (string 'inactive|active|automatic') Wipers state
   * @property {String} wipersIntensity (string 'level_0|level_1|level_2|level_3') Wipers intensity (optional)
   */
  static controlWipers(wipersState: string, wipersIntensity: string) {
    validate([
      {
        value: wipersState,
        name: 'Wipers state',
        condition: Joi.string().required(),
      },
      {
        value: wipersIntensity,
        name: 'Wipers intensity',
        condition: Joi.string(),
      },
    ]);

    let wipersIntensityBytes = [];

    if (!!wipersIntensity) {
      wipersIntensityBytes = this.buildProperty(
        0x02,
        this.getWipersIntensityByte(wipersIntensity)
      );
    }

    return new Command([
      0x00,
      0x42,
      0x14,
      ...this.buildProperty(0x01, this.getWiperStateByte(wipersState)),
      ...wipersIntensityBytes,
    ]);
  }

  static getDamageByte(damage: string) {
    switch (damage) {
      case 'impact_but_no_damage_detected':
        return 0x01;
      case 'damage_smaller_than_1_inch':
        return 0x02;
      case 'damage_larger_than_1_inch':
        return 0x03;
      default:
        return 0x00;
    }
  }

  static getNeedReplacementByte(needsReplacement: string) {
    switch (needsReplacement) {
      case 'no':
      case 'no_replacement_needed':
        return 0x01;
      case 'yes':
      case 'replacement_needed':
        return 0x02;
      default:
        return 0x00;
    }
  }

  static getWiperStateByte(wiperState: string) {
    switch (wiperState) {
      case 'active':
        return 0x01;
      case 'automatic':
        return 0x02;
      default:
        return 0x00;
    }
  }

  static getWipersIntensityByte(wipersIntensity: string) {
    switch (wipersIntensity) {
      case 'level_1':
        return 0x01;
      case 'level_2':
        return 0x02;
      case 'level_3':
        return 0x03;
      default:
        return 0x00;
    }
  }
}
