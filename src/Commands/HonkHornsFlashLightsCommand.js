import Command from './Command';

export default class HonkHornsFlashLightsCommand {
  static honkHornsFlashLights(honkHorn: number, flashLights: number) {
    return new Command([0x00, 0x26, 0x00, honkHorn, flashLights]);
  }

  static activateEmergencyFlasher(activate) {
    const byte = activate ? 0x01 : 0x00;

    return new Command([0x00, 0x26, 0x01, byte]);
  }
}
