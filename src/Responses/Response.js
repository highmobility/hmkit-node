import ChargingResponse from './ChargingResponse';
import ChassisSettingsResponse from './ChassisSettingsResponse';
import ClimateResponse from './ClimateResponse';
import DiagnosticsResponse from './DiagnosticsResponse';
import DoorLocksResponse from './DoorLocksResponse';
import EngineResponse from './EngineResponse';
import EmptyResponse from './EmptyResponse';
import FailureMessageResponse from './FailureMessageResponse';
import HonkHornsFlashLightsResponse from './HonkHornsFlashLightsResponse';
import LightConditionsResponse from './LightConditionsResponse';
import LightsResponse from './LightsResponse';
import MaintenanceResponse from './MaintenanceResponse';
import MessagingResponse from './MessagingResponse';
import NotificationResponse from './NotificationResponse';
import OffroadResponse from './OffroadResponse';
import ParkingBrakeResponse from './ParkingBrakeResponse';
import ParkingTicketResponse from './ParkingTicketResponse';
import RaceResponse from './RaceResponse';
import RooftopControlResponse from './RooftopControlResponse';
import SeatsResponse from './SeatsResponse';
import TheftAlarmResponse from './TheftAlarmResponse';
import TrunkAccessResponse from './TrunkAccessResponse';
import ValetModeResponse from './ValetModeResponse';
import VehicleLocationResponse from './VehicleLocationResponse';
import VehicleTimeResponse from './VehicleTimeResponse';
import WeatherConditionsResponse from './WeatherConditionsResponse';
import WiFiResponse from './WiFiResponse';
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
      LightConditionsResponse,
      LightsResponse,
      MaintenanceResponse,
      MessagingResponse,
      NotificationResponse,
      OffroadResponse,
      ParkingBrakeResponse,
      ParkingTicketResponse,
      RaceResponse,
      RooftopControlResponse,
      SeatsResponse,
      TheftAlarmResponse,
      TrunkAccessResponse,
      ValetModeResponse,
      VehicleLocationResponse,
      VehicleTimeResponse,
      WeatherConditionsResponse,
      WiFiResponse,
      WindowsResponse,
      WindscreenResponse,
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
