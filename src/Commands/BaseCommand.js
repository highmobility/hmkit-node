import { decimalToHexArray } from '../encoding';

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
      return Array.isArray(encodedValue) ? encodedValue : [encodedValue];
    }

    return Array.isArray(value) ? value : [value];
  }
}
