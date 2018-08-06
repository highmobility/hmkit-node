export default class Property {
  constructor(identifier: number, namespace: string) {
    this.identifier = identifier;
    this.namespace = namespace;
    this.value = undefined;
    this.subProperties = [];
    this.subPropertiesIdentifierNamespace = null;
  }

  getValue = () => {
    if (
      this.subProperties.length > 0 &&
      this.subPropertiesIdentifierNamespace !== null
    ) {
      const value = [];

      this.subProperties.forEach(subProperty => {
        const subPropertyValue = subProperty.getValue();

        if (subPropertyValue !== undefined && subPropertyValue !== null) {
          value.push({
            [this.subPropertiesIdentifierNamespace]:
              subProperty.identifierValue,
            ...subPropertyValue,
          });
        }
      });

      return value;
    }

    return this.value;
  };

  parseValue = (data: Array<number>) => {
    if (this.subProperties.length > 0 && data.length > 0) {
      const subProperty = this.findSubProperty(data[0]);

      if (!!subProperty) {
        subProperty.parseValue(data.slice(1, data.length));
      }

      return null;
    }

    this.value = this.decode(data);
    return this.value;
  };

  decode = (data: Array<number>) => {
    if (!!this.decoder) {
      return this.decoder(data);
    } else if (data.length === 1) {
      return data[0];
    }

    return data;
  };

  setDecoder = (decoder: Function) => {
    this.decoder = decoder;
    return this;
  };

  setOptionalSubProperties = (
    identifierNamespace: String,
    subProperties: Array<OptionalProperty>
  ) => {
    this.subProperties.push(...subProperties);
    this.subPropertiesIdentifierNamespace = identifierNamespace;
    return this;
  };

  findSubProperty = (identifier: number) =>
    this.subProperties.find(
      supProperty => supProperty.identifier === identifier
    );
}
