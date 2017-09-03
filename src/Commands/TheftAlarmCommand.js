import Command from './Command';

export default class TheftAlarmCommand {
  static getState() {
    return new Command([0x00, 0x46, 0x00]);
  }

  static setState(action: string) {
    const actionOptions = {
      unarm: 0x00,
      arm: 0x01,
      trigger: 0x02,
    };

    return new Command([0x00, 0x46, 0x02, actionOptions[action]]);
  }
}
