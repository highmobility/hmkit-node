import DiagnosticsResponse from './DiagnosticsResponse';
import DoorLocksResponse from './DoorLocksResponse';
import EngineResponse from './EngineResponse';
import EmptyResponse from './EmptyResponse';
import FailureMessageResponse from './FailureMessageResponse';
import MaintenanceResponse from './MaintenanceResponse';
import TrunkAccessResponse from './TrunkAccessResponse';
import VehicleLocationResponse from './VehicleLocationResponse';

export default class Response {
  constructor(data: string) {
    this.rawData = data;
    this.checkRawDataLength();

    this.parsers = [
      DiagnosticsResponse,
      DoorLocksResponse,
      EngineResponse,
      FailureMessageResponse,
      MaintenanceResponse,
      TrunkAccessResponse,
      VehicleLocationResponse,
    ];
  }

  checkRawDataLength() {
    if (this.rawData.length < 2 && this.rawData.length !== 0) {
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
      if (bytes.length === 0) return new EmptyResponse();
      return bytes;
    }

    return new Parser(bytes);
  }

  findParser(bytes) {
    if (bytes.length === 0) {
      return null;
    }

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
