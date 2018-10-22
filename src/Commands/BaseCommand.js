import { decimalToHexArray } from '../encoding';
import { isArray } from '../helpers';

export default class BaseCommand {
  static buildProperty(identifier: Number, value: Any, encodingFunc: Function) {
    const encodedValue = this.encodeProperty(value, encodingFunc);

    return [
      identifier,
      ...decimalToHexArray(encodedValue.length, 2),
      ...encodedValue,
    ];
  }

  static encodeProperty(value: Any, encodingFunc: Function) {
    if (!!encodingFunc) {
      const encodedValue = encodingFunc(value);
      return isArray(encodedValue) ? encodedValue : [encodedValue];
    }

    return isArray(value) ? value : [value];
  }
}
