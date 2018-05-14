import Command from './Command';

export default class CruiseControlCommand {
  static getState() {
    return new Command([0x00, 0x62, 0x00]);
  }

  static activateCruiseControl(targetSpeed: ?number) {
    const targetSpeedBytes =
      targetSpeed !== null && targetSpeed !== undefined
        ? [0x02, 0x00, 0x01, targetSpeed]
        : [];

    return new Command([
      0x00,
      0x62,
      0x02,
      0x01,
      0x00,
      0x01,
      0x01,
      ...targetSpeedBytes,
    ]);
  }

  static deactivateCruiseControl() {
    return new Command([0x00, 0x62, 0x02, 0x01, 0x00, 0x01, 0x00]);
  }
}
