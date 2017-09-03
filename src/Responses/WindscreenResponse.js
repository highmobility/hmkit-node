export default class WindscreenResponse {
  static identifier = [0x00, 0x42];

  constructor(bytes) {
    this.wipers = {
      state: this.getWiperState(bytes),
      intensityLevel: this.getWipersIntensityLevel(bytes),
    };

    this.windscreen = {
      damage: this.getWindscreenDamage(bytes),
      zoneMatrix: this.getZone(bytes[6]),
      damageZone: this.getZone(bytes[7]),
      needsReplacement: this.getNeedsReplacement(bytes),
      damageConfidence: this.getDamageConfidence(bytes),
      damageDetectionDate: this.getDate(bytes, 10),
    };
  }

  getWiperState(bytes) {
    switch (bytes[3]) {
      case 0x01:
        return 'active';
      case 0x02:
        return 'automatic';
      default:
        return 'inactive';
    }
  }

  getWipersIntensityLevel(bytes) {
    switch (bytes[4]) {
      case 0x01:
        return 1;
      case 0x02:
        return 2;
      case 0x03:
        return 3;
      default:
        return 0;
    }
  }

  getWindscreenDamage(bytes) {
    switch (bytes[5]) {
      case 0x01:
        return 'no_damage';
      case 0x02:
        return 'damage_smaller_than_1_inch';
      case 0x03:
        return 'damage_larger_than_1_inch';
      default:
        return 'no_impact_occured';
    }
  }

  getZone(theByte) {
    if (theByte === 0x00) {
      return 'unknown';
    }

    return { horisontal: (theByte & 0xf0) >> 4, vertical: theByte & 0x0f };
  }

  getNeedsReplacement(bytes) {
    switch (bytes[8]) {
      case 0x01:
        return 'no';
      case 0x02:
        return 'yes';
      default:
        return 'unknown';
    }
  }

  getDamageConfidence(bytes) {
    return bytes[9] / 100;
  }

  getDate(bytes, idx) {
    return {
      year: 2000 + bytes[idx],
      month: bytes[idx + 1],
      day: bytes[idx + 2],
      hour: bytes[idx + 3],
      minute: bytes[idx + 4],
      seconds: bytes[idx + 5],
    };
  }
}
