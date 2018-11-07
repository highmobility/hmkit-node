import Command from './Command';
import BaseCommand from './BaseCommand';
import { stringToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class MessagingCommand extends BaseCommand {
  /**
   * @function messageReceived
   *
   * @property {String} handle (string) Sender handle
   * @property {String} text (string) Text to send
   */
  static messageReceived(handle: string, text: string) {
    validate([
      {
        value: text,
        name: 'Text',
        condition: Joi.string().required(),
      },
      {
        value: handle,
        name: 'Handle',
        condition: Joi.string(),
      },
    ]);

    const handleBytes = !!handle
      ? this.buildProperty(0x02, stringToBytes(handle))
      : [];

    return new Command([
      0x00,
      0x37,
      0x00,
      ...this.buildProperty(0x01, stringToBytes(text)),
      ...handleBytes,
    ]);
  }
}
