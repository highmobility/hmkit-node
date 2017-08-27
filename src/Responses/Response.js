import DiagnosticsResponse from './DiagnosticsResponse';
import DoorLocksResponse from './DoorLocksResponse';
import EngineResponse from './EngineResponse';
import VehicleLocationResponse from './VehicleLocationResponse';

export default class Response {
  constructor(data: string) {
    this.rawData = data;
    this.checkRawDataLength();

    this.parsers = [
      DiagnosticsResponse,
      DoorLocksResponse,
      EngineResponse,
      VehicleLocationResponse,
    ];
  }

  checkRawDataLength() {
    if (this.rawData.length < 2) {
      throw new Error(
        `Response string length invalid (length: ${this.rawData.length} chars).`
      );
    }
  }

  bytes() {
    return this.rawData;
  }

  parse() {
    const bytes = this.bytes();
    const Parser = this.findParser(bytes);

    if (!Parser) {
      return bytes;
    }

    return new Parser(bytes);
  }

  findParser(bytes) {
    for (const parser of this.parsers) {
      if (
        parser.identifier[0] === bytes[0] &&
        parser.identifier[1] === bytes[1]
      ) {
        return parser;
      }
    }

    return null;
  }
}
