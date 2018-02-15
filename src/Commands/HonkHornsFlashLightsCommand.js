import Command from './Command';

export default class HonkHornsFlashLightsCommand {
  static getFlashersState() {
    return new Command([0x00, 0x26, 0x00]);
  }

  static honkHornsFlashLights(honkHorn: number, flashLights: number) {
    return new Command([
      0x00,
      0x26,
      0x02,
      0x01,
      0x00,
      0x01,
      honkHorn,
      0x02,
      0x00,
      0x01,
      flashLights,
    ]);
  }

  static activateEmergencyFlasher() {
    return new Command([0x00, 0x26, 0x03, 0x01]);
  }

  static deactivateEmergencyFlasher() {
    return new Command([0x00, 0x26, 0x03, 0x00]);
  }
}
