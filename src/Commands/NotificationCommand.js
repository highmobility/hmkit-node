import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class NotificationCommand {
  /**
   * @function send
   *
   * @property {String} text (string) Text
   * @property {Object} actions (Object `{action1Id: action1Text, action2Id: action2Text, ..}`) Actions
   *
   * @example send
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.NotificationCommand.send(
        'Start navigation?',
        {
          0: 'No',
          1: 'Yes',
          2: 'Soon',
        }
      );
    );
   */
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

  /**
   * @function clear
   */
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
