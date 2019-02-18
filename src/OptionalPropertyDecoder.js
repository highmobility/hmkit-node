import PropertyDecoder from './PropertyDecoder';

export default class OptionalPropertyDecoder extends PropertyDecoder {
  constructor(identifier: Number, identifierValue: Any) {
    super(identifier, null);
    this.identifierValue = identifierValue;
  }
}
