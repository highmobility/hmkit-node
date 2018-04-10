import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class BrowserCommand {
  static loadUrl(url) {
    validate([
      {
        value: url,
        name: 'Url',
        condition: Joi.string().required(),
      },
    ]);

    const urlBytes = stringToBytes(url);

    return new Command([
      0x00,
      0x49,
      0x00,
      0x01,
      ...intToTwoBytes(urlBytes.length),
      ...urlBytes,
    ]);
  }
}
