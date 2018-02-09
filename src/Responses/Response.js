import ChargingResponse from './ChargingResponse';
import ChassisSettingsResponse from './ChassisSettingsResponse';
import ClimateResponse from './ClimateResponse';
import DiagnosticsResponse from './DiagnosticsResponse';
import DoorLocksResponse from './DoorLocksResponse';
import EngineResponse from './EngineResponse';
import EmptyResponse from './EmptyResponse';
import FailureMessageResponse from './FailureMessageResponse';
import HonkHornsFlashLightsResponse from './HonkHornsFlashLightsResponse';
import LightsResponse from './LightsResponse';
import MaintenanceResponse from './MaintenanceResponse';
import MessagingResponse from './MessagingResponse';
import NotificationResponse from './NotificationResponse';
import ParkingTicketResponse from './ParkingTicketResponse';
import RooftopControlResponse from './RooftopControlResponse';
import TheftAlarmResponse from './TheftAlarmResponse';
import TrunkAccessResponse from './TrunkAccessResponse';
import ValetModeResponse from './ValetModeResponse';
import VehicleLocationResponse from './VehicleLocationResponse';
import WindowsResponse from './WindowsResponse';
import WindscreenResponse from './WindscreenResponse';
import CapabilitiesResponse from './CapabilitiesResponse';

export default class Response {
  constructor(data: string) {
    this.rawData = data;

    this.checkRawDataLength();

    this.parsers = [
      CapabilitiesResponse,
      ChargingResponse,
      ChassisSettingsResponse,
      ClimateResponse,
      DiagnosticsResponse,
      DoorLocksResponse,
      EngineResponse,
      FailureMessageResponse,
      HonkHornsFlashLightsResponse,
      LightsResponse,
      MaintenanceResponse,
      MessagingResponse,
      NotificationResponse,
      ParkingTicketResponse,
      RooftopControlResponse,
      TheftAlarmResponse,
      TrunkAccessResponse,
      ValetModeResponse,
      VehicleLocationResponse,
      WindowsResponse,
      WindscreenResponse
    ];
  }

  checkRawDataLength() {
    if (this.rawData.length < 2 && this.rawData.length !== 0) {
      throw new Error(`Response string length invalid (length: ${this.rawData.length} chars).`);
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
      if (parser.identifier[0] === bytes[0] && parser.identifier[1] === bytes[1]) {
        return parser;
      }
    }

    return null;
  }
}
