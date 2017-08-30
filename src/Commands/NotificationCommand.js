import Command from './Command';
import { stringToHex, hexToUint8Array, intToHex, pad } from '../encoding';

export default class NotificationCommand {
  static send(text: string, actions: Object) {
    const textBytes = this.getTextBytes(text);
    const actionsBytes = this.getActionsBytes(actions);
    return new Command([0x00, 0x38, 0x00, ...textBytes, ...actionsBytes]);
  }

  static getTextBytes(text) {
    const stringBytes = hexToUint8Array(stringToHex(text));
    const lengthBytes = hexToUint8Array(pad(intToHex(stringBytes.length), 4));
    return [...lengthBytes, ...stringBytes];
  }

  static getActionsBytes(actions) {
    const actionsCount = Object.keys(actions).length;
    let result = [actionsCount];

    for (const [actionId, actionName] of Object.entries(actions)) {
      const actionBytes = hexToUint8Array(stringToHex(actionName));
      result = [...result, actionId, actionBytes.length, ...actionBytes];
    }

    return result;
  }
}
