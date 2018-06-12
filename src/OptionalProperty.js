import Property from './Property';

export default class OptionalProperty extends Property {
  constructor(identifier: Number, identifierValue: Any) {
    super(identifier, null);
    this.identifierValue = identifierValue;
  }
}
