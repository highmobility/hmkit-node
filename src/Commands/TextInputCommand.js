import Command from './Command';
import BaseCommand from './BaseCommand';
import { stringToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class TextInputCommand extends BaseCommand {
  /**
   * @function textInput
   *
   * @property {String} text (string) The text formatted in UTF-8
   */
  static textInput(text: String) {
    validate([
      {
        value: text,
        name: 'Text',
        condition: Joi.string().required(),
      },
    ]);

    return new Command([
      0x00,
      0x44,
      0x00,
      ...this.buildProperty(0x01, stringToBytes(text)),
    ]);
  }
}
