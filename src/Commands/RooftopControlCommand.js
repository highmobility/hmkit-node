import Command from './Command';

export default class RooftopControlCommand {
  static getState() {
    return new Command([0x00, 0x25, 0x00]);
  }

  static control(dimming: number, position: number) {
    if (dimming > 0.0 && dimming < 1.0) {
      dimming = dimming * 100;
    }

    if (position > 0.0 && position < 1.0) {
      position = position * 100;
    }

    return new Command([
      0x00,
      0x25,
      0x02,
      0x01,
      0x00,
      0x01,
      dimming,
      0x02,
      0x00,
      0x01,
      open,
    ]);
  }
}
