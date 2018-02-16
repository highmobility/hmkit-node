import BrowserCommand from './Commands/BrowserCommand';
import CapabilitiesCommand from './Commands/CapabilitiesCommand';
import ChargingCommand from './Commands/ChargingCommand';
import ChassisSettingsCommand from './Commands/ChassisSettingsCommand';
import ClimateCommand from './Commands/ClimateCommand';
import DiagnosticsCommand from './Commands/DiagnosticsCommand';
import DoorLocksCommand from './Commands/DoorLocksCommand';
import EngineCommand from './Commands/EngineCommand';
import FirmwareVersionCommand from './Commands/FirmwareVersionCommand';
import FuelingCommand from './Commands/FuelingCommand';
import GraphicsCommand from './Commands/GraphicsCommand';
import HonkHornFlashLightsCommand from './Commands/HonkHornFlashLightsCommand';
import LightConditionsCommand from './Commands/LightConditionsCommand';
import LightsCommand from './Commands/LightsCommand';
import MaintenanceCommand from './Commands/MaintenanceCommand';
import MessagingCommand from './Commands/MessagingCommand';
import NaviDestinationCommand from './Commands/NaviDestinationCommand';
import NotificationCommand from './Commands/NotificationCommand';
import OffroadCommand from './Commands/OffroadCommand';
import ParkingBrakeCommand from './Commands/ParkingBrakeCommand';
import ParkingTicketCommand from './Commands/ParkingTicketCommand';
import RaceCommand from './Commands/RaceCommand';
import RooftopControlCommand from './Commands/RooftopControlCommand';
import SeatsCommand from './Commands/SeatsCommand';
import TextInputCommand from './Commands/TextInputCommand';
import TheftAlarmCommand from './Commands/TheftAlarmCommand';
import TrunkAccessCommand from './Commands/TrunkAccessCommand';
import ValetModeCommand from './Commands/ValetModeCommand';
import VehicleLocationCommand from './Commands/VehicleLocationCommand';
import VehicleStatusCommand from './Commands/VehicleStatusCommand';
import VehicleTimeCommand from './Commands/VehicleTimeCommand';
import VideoHandoverCommand from './Commands/VideoHandoverCommand';
import WakeUpCommand from './Commands/WakeUpCommand';
import WeatherConditionsCommand from './Commands/WeatherConditionsCommand';
import WiFiCommand from './Commands/WiFiCommand';
import WindowsCommand from './Commands/WindowsCommand';
import WindscreenCommand from './Commands/WindscreenCommand';

export default class Commands {
  constructor() {
    Object.assign(this, {
      BrowserCommand,
      CapabilitiesCommand,
      ChargingCommand,
      ChassisSettingsCommand,
      ClimateCommand,
      DiagnosticsCommand,
      DoorLocksCommand,
      EngineCommand,
      FirmwareVersionCommand,
      FuelingCommand,
      GraphicsCommand,
      HonkHornFlashLightsCommand,
      LightConditionsCommand,
      LightsCommand,
      MaintenanceCommand,
      MessagingCommand,
      NaviDestinationCommand,
      NotificationCommand,
      OffroadCommand,
      ParkingBrakeCommand,
      ParkingTicketCommand,
      RaceCommand,
      RooftopControlCommand,
      SeatsCommand,
      TextInputCommand,
      TheftAlarmCommand,
      TrunkAccessCommand,
      ValetModeCommand,
      VehicleLocationCommand,
      VehicleStatusCommand,
      VehicleTimeCommand,
      VideoHandoverCommand,
      WakeUpCommand,
      WeatherConditionsCommand,
      WiFiCommand,
      WindowsCommand,
      WindscreenCommand,
    });
  }
}
