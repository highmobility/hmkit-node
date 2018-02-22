import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class NotificationCommand {
  static send(text: string, actions: Object) {
    const textBytes = stringToBytes(text);

    return new Command([
      0x00,
      0x38,
      0x00,
      0x01,
      ...intToTwoBytes(textBytes.length),
      ...textBytes,
      ...this.getActionsBytes(actions),
    ]);
  }

  static clear() {
    return new Command([0x00, 0x38, 0x02]);
  }

  static getActionsBytes(actions) {
    let result = [];

    for (const [actionId, actionName] of Object.entries(actions)) {
      const nameBytes = stringToBytes(actionName);

      result = [
        ...result,
        0x02,
        ...intToTwoBytes(nameBytes.length + 1),
        actionId,
        ...nameBytes,
      ];
    }

    return result;
  }
}
