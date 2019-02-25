import { decimalToHexArray, PROPERTY_DATA_ID } from '../encoding';
import { isArray } from '../helpers';

export default class BaseCommand {
  static buildProperty(identifier: Number, value: Any, encodingFunc: Function) {
    const encodedValue = this.encodeProperty(value, encodingFunc);

    const dataComponent = [
      PROPERTY_DATA_ID,
      ...decimalToHexArray(encodedValue.length, 2),
      ...encodedValue,
    ];

    return [
      identifier,
      ...decimalToHexArray(dataComponent.length, 2),
      ...dataComponent,
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
