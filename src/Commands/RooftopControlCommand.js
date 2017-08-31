import Command from './Command';

export default class RooftopControlCommand {
  static getState() {
    return new Command([0x00, 0x25, 0x00]);
  }

  static setState(dimming: number, open: number) {
    return new Command([0x00, 0x25, 0x02, dimming * 100, open * 100]);
  }
}
