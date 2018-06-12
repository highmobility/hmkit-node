import Command from './Command';

export default class HonkHornFlashLightsCommand {
  /**
   * @function getFlashersState
   */
  static getFlashersState() {
    return new Command([0x00, 0x26, 0x00]);
  }

  /**
   * @function honkHornFlashLights
   *
   * @property {Number} honkHorn (number) Seconds
   * @property {Number} flashLights (number) Number of times
   */
  static honkHornFlashLights(honkHorn: number, flashLights: number) {
    const commandBase = [0x00, 0x26, 0x02];

    if (!!honkHorn) commandBase.push(0x01, 0x00, 0x01, honkHorn);
    if (!!flashLights) commandBase.push(0x02, 0x00, 0x01, flashLights);

    return new Command(commandBase);
  }

  /**
   * @function activateEmergencyFlasher
   */
  static activateEmergencyFlasher() {
    return new Command([0x00, 0x26, 0x03, 0x01]);
  }

  /**
   * @function deactivateEmergencyFlasher
   */
  static deactivateEmergencyFlasher() {
    return new Command([0x00, 0x26, 0x03, 0x00]);
  }
}
