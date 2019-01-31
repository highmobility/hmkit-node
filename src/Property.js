export default class Property {
  constructor(identifier: number, namespace: string) {
    this.identifier = identifier;
    this.namespace = namespace;
    this.value = undefined;
    this.isArray = false;
    this.subProperties = [];
    this.subPropertiesIdentifierNamespace = null;
  }

  array = () => {
    this.isArray = true;
    return this;
  };

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
        if (this.subPropertiesIdentifierNamespace !== null) {
          return {
            [this.namespace]: [
              {
                [this.subPropertiesIdentifierNamespace]:
                  subProperty.identifierValue,
                ...subProperty.parseValue(data.slice(1, data.length)),
              },
            ],
          };
        }
        return subProperty.parseValue(data.slice(1, data.length));
      }

      return { [this.namespace]: null };
    } else if (this.isArray) {
      return { [this.namespace]: [this.decode(data)] };
    } else if (this.namespace) {
      return { [this.namespace]: this.decode(data) };
    }
    return this.decode(data);
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
