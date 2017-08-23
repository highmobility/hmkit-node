import DiagnosticsResponse from 'src/Responses/DiagnosticsResponse';
import EngineResponse from 'src/Responses/EngineResponse';

export default class Response {
  constructor(data: string) {
    this.rawData = data;
    this.checkRawDataLength();

    this.parsers = [
      DiagnosticsResponse,
      EngineResponse,
    ];
  }

  checkRawDataLength() {
    if (this.rawData.length < 2) {
      throw new Error(`Response string length invalid (length: ${this.rawData.length} chars).`);
    }
  }

  bytes() {
    return this.rawData;
  }

  get() {
    const bytes = this.bytes();
    const parser = this.findParser(bytes);

    if (!parser) {
      return bytes;
    }

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
