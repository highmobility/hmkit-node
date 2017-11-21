export default class Property {
  constructor(identifier: number, namespace: string) {
    this.identifier = identifier;
    this.namespace = namespace;
    this.value = null;
  }

  parseValue = (data: Array<number>) => {
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
}
