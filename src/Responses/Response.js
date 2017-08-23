import EngineResponse from 'src/Responses/EngineResponse';

export default class Response {
  constructor(data: string) {
    this.rawData = data;
    this.checkRawDataLength();

    this.parsers = [
      EngineResponse,
    ];
  }

  checkRawDataLength() {
    if (this.rawData.length % 2 > 0) {
      throw new Error(`Response string length invalid (length: ${this.rawData.length} chars).`);
    }

    if (this.rawData.length <= 3) {
      throw new Error(`Response string length invalid (length: ${this.rawData.length} chars).`);
    }
  }

  raw() {
    return this.rawData;
  }

  bytes() {
    const chunks = this.rawData.match(/.{1,2}/g);
    return chunks.map(chunk => Number(`0x${chunk}`));
  }

  get() {
    const bytes = this.bytes();
    const parser = this.findParser(bytes);
    return new parser(bytes);
  }

  findParser(bytes) {
    for (const parser of this.parsers) {
      if (parser.identifier[0] === bytes[0] && parser.identifier[1] === bytes[1]) {
        return parser;
      }
    }

    return null;
  }
}
