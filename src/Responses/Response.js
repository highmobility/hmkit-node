import ChargingResponse from './ChargingResponse';
import ChassisSettingsResponse from './ChassisSettingsResponse';
import ClimateResponse from './ClimateResponse';
import CruiseControlResponse from './CruiseControlResponse';
import DashboardLightsResponse from './DashboardLightsResponse';
import DiagnosticsResponse from './DiagnosticsResponse';
import DoorLocksResponse from './DoorLocksResponse';
import EngineResponse from './EngineResponse';
import EmptyResponse from './EmptyResponse';
import FailureMessageResponse from './FailureMessageResponse';
import FirmwareVersionResponse from './FirmwareVersionResponse';
import FuelingResponse from './FuelingResponse';
import HomeChargerResponse from './HomeChargerResponse';
import HonkHornFlashLightsResponse from './HonkHornFlashLightsResponse';
import LightConditionsResponse from './LightConditionsResponse';
import LightsResponse from './LightsResponse';
import MaintenanceResponse from './MaintenanceResponse';
import NaviDestinationResponse from './NaviDestinationResponse';
import OffroadResponse from './OffroadResponse';
import ParkingBrakeResponse from './ParkingBrakeResponse';
import ParkingTicketResponse from './ParkingTicketResponse';
import PowerTakeOffResponse from './PowerTakeOffResponse';
import RaceResponse from './RaceResponse';
import RooftopControlResponse from './RooftopControlResponse';
import SeatsResponse from './SeatsResponse';
import StartStopResponse from './StartStopResponse';
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
import VehicleStatusResponse from './VehicleStatusResponse';

export default class Response {
  constructor(data: Array<Number>) {
    this.rawData = data;

    this.checkRawDataLength();

    this.parsers = [
      CapabilitiesResponse,
      ChargingResponse,
      ChassisSettingsResponse,
      ClimateResponse,
      CruiseControlResponse,
      DashboardLightsResponse,
      DiagnosticsResponse,
      DoorLocksResponse,
      EngineResponse,
      FailureMessageResponse,
      FirmwareVersionResponse,
      FuelingResponse,
      HomeChargerResponse,
      HonkHornFlashLightsResponse,
      LightConditionsResponse,
      LightsResponse,
      MaintenanceResponse,
      NaviDestinationResponse,
      OffroadResponse,
      ParkingBrakeResponse,
      ParkingTicketResponse,
      PowerTakeOffResponse,
      RaceResponse,
      RooftopControlResponse,
      SeatsResponse,
      StartStopResponse,
      TheftAlarmResponse,
      TrunkAccessResponse,
      ValetModeResponse,
      VehicleLocationResponse,
      VehicleStatusResponse,
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

  parse = (() => {
    let parsedValue = null;

    return function parse() {
      if (parsedValue !== null) return parsedValue;

      const bytes = this.bytes();
      const Parser = this.findParser(bytes);

      if (!Parser) {
        if (bytes.length === 0) return new EmptyResponse();
        return bytes;
      }

      parsedValue = new Parser(bytes);
      return parsedValue;
    };
  })();

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
