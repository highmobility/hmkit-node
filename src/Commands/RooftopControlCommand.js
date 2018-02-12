import Command from './Command';

export default class RooftopControlCommand {
  static getRooftopState() {
    return new Command([0x00, 0x25, 0x00]);
  }

  static controlRooftop(dimming: number, position: number) {
    return new Command([
      0x00,
      0x25,
      0x02,
      0x01,
      0x00,
      0x01,
      dimming * 100,
      0x02,
      0x00,
      0x01,
      open * 100,
    ]);
  }
}
