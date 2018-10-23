import Command from './Command';
import BaseCommand from './BaseCommand';

export default class HonkHornFlashLightsCommand extends BaseCommand {
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
    const commandBase = [0x00, 0x26, 0x12];

    if (!!honkHorn) commandBase.push(...this.buildProperty(0x01, honkHorn));
    if (!!flashLights)
      commandBase.push(...this.buildProperty(0x02, flashLights));

    return new Command(commandBase);
  }

  /**
   * @function activateEmergencyFlasher
   */
  static activateEmergencyFlasher() {
    return new Command([0x00, 0x26, 0x13, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function deactivateEmergencyFlasher
   */
  static deactivateEmergencyFlasher() {
    return new Command([0x00, 0x26, 0x13, ...this.buildProperty(0x01, 0x00)]);
  }
}
