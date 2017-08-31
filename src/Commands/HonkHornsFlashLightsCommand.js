import Command from './Command';

export default class HonkHornsFlashLightsCommand {
  static honkHornsFlashLights(honkHorn: number, flashLights: number) {
    return new Command([0x00, 0x26, 0x00, honkHorn, flashLights]);
  }

  static activateEmergencyFlasher() {
    return new Command([0x00, 0x26, 0x01, 0x01]);
  }

  static deactivateEmergencyFlasher() {
    return new Command([0x00, 0x26, 0x01, 0x00]);
  }
}
