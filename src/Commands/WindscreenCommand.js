import Command from './Command';

export default class WindscreenCommand {
  static getState() {
    return new Command([0x00, 0x42, 0x00]);
  }

  static setDamage(
    damage: string,
    damageZoneHorisontal: number,
    damageZoneVertical: number,
    needsReplacement: string
  ) {
    const damageBytes = this.getDamageByte(damage);
    const zoneBytes = this.getDamageZoneByte(
      damageZoneHorisontal,
      damageZoneVertical
    );
    const replacementBytes = this.getNeedReplacementByte(needsReplacement);

    return new Command([
      0x00,
      0x42,
      0x02,
      damageBytes,
      zoneBytes,
      replacementBytes,
    ]);
  }

  static getDamageByte(damage) {
    switch (damage) {
      case 'no_damage':
        return 0x01;
      case 'damage_smaller_than_1_inch':
        return 0x02;
      case 'damage_larger_than_1_inch':
        return 0x03;
      default:
        return 0x00; // Maybe should default to 0xFF instead
    }
  }

  static getDamageZoneByte(horisontal, vertical) {
    const zone = ((horisontal & 0x0f) << 4) + (vertical & 0x0f);

    return zone;
  }

  static getNeedReplacementByte(needsReplacement) {
    switch (needsReplacement) {
      case 'no':
        return 0x01;
      case 'yes':
        return 0x02;
      default:
        return 0x00;
    }
  }
}
