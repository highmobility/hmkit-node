export default class Property {
  constructor(identifier: number, namespace: string) {
    this.identifier = identifier;
    this.namespace = namespace;
    this.value = null;
    this.subProperties = [];
  }

  getValue = () => {
    if (this.subProperties.length > 0) {
      const value = {};

      this.subProperties.forEach(subProperty => {
        value[subProperty.namespace] = subProperty.getValue();
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

  setSubProperty = (subProperty: Property) => {
    this.subProperties.push(subProperty);
    return this;
  };

  findSubProperty = (identifier: number) =>
    this.subProperties.find(
      supProperty => supProperty.identifier === identifier
    );
}
