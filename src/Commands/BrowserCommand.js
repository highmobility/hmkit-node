import Command from './Command';
import BaseCommand from './BaseCommand';
import { stringToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class BrowserCommand extends BaseCommand {
  /**
   * @function loadUrl
   *
   * @property {String} url (string) Url to be loaded in.
   */
  static loadUrl(url) {
    validate([
      {
        value: url,
        name: 'Url',
        condition: Joi.string().required(),
      },
    ]);

    return new Command([
      0x00,
      0x49,
      0x00,
      ...this.buildProperty(0x01, stringToBytes(url)),
    ]);
  }
}
