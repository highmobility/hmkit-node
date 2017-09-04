import Command from './Command';

export default class TheftAlarmCommand {
  static getState() {
    return new Command([0x00, 0x46, 0x00]);
  }

  static unarm() {
    return new Command([0x00, 0x46, 0x02, 0x00]);
  }

  static arm() {
    return new Command([0x00, 0x46, 0x02, 0x01]);
  }

  static triggerAlarm() {
    return new Command([0x00, 0x46, 0x02, 0x02]);
  }
}
