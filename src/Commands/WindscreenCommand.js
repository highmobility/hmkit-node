import Command from './Command';

export default class WindscreenCommand {
  static getState() {
    return new Command([0x00, 0x42, 0x00]);
  }

  static setDamage(
    damage: string,
    damageZoneRow: number,
    damageZoneColumn: number,
    needsReplacement: string
  ) {
    const damageByte = this.getDamageByte(damage);
    const zoneByte = ((damageZoneRow & 0x0f) << 4) + (damageZoneColumn & 0x0f);
    const replacementByte = this.getNeedReplacementByte(needsReplacement);

    return new Command([
      0x00,
      0x42,
      0x02,
      0x03,
      0x00,
      0x01,
      damageByte,
      0x05,
      0x00,
      0x01,
      zoneByte,
      0x06,
      0x00,
      0x01,
      replacementByte,
    ]);
  }

  static getDamageByte(damage) {
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

  static getNeedReplacementByte(needsReplacement) {
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
}
