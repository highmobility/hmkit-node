import Command from './Command';
import BaseCommand from './BaseCommand';
import { stringToBytes } from '../encoding';

export default class NotificationCommand extends BaseCommand {
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
    return new Command([
      0x00,
      0x38,
      0x00,
      ...this.buildProperty(0x01, stringToBytes(text)),
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
    return Object.entries(actions).reduce(
      (actionBytes, [actionId, actionName]) =>
        actionBytes.concat(
          this.buildProperty(0x02, [actionId, ...stringToBytes(actionName)])
        ),
      []
    );
  }
}
