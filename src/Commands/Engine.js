import Command from 'src/Commands/Command';

export default class Engine {
  static getIgnitionState() {
    return new Command([0x00, 0x35, 0x00]);
  }

  static turnOff() {
    return new Command([0x00, 0x35, 0x02, 0x00]);
  }

  static turnOn() {
    return new Command([0x00, 0x35, 0x02, 0x01]);
  }
}
