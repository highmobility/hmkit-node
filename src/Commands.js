import BrowserCommand from './Commands/BrowserCommand';
import CapabilitiesCommand from './Commands/CapabilitiesCommand';
import ChargingCommand from './Commands/ChargingCommand';
import ChassisSettingsCommand from './Commands/ChassisSettingsCommand';
import ClimateCommand from './Commands/ClimateCommand';
import CruiseControlCommand from './Commands/CruiseControlCommand';
import DashboardLightsCommand from './Commands/DashboardLightsCommand';
import DiagnosticsCommand from './Commands/DiagnosticsCommand';
import DoorLocksCommand from './Commands/DoorLocksCommand';
import EngineCommand from './Commands/EngineCommand';
import FirmwareVersionCommand from './Commands/FirmwareVersionCommand';
import FuelingCommand from './Commands/FuelingCommand';
import GraphicsCommand from './Commands/GraphicsCommand';
import HomeChargerCommand from './Commands/HomeChargerCommand';
import HonkHornFlashLightsCommand from './Commands/HonkHornFlashLightsCommand';
import HoodCommand from './Commands/HoodCommand';
import LightConditionsCommand from './Commands/LightConditionsCommand';
import LightsCommand from './Commands/LightsCommand';
import MaintenanceCommand from './Commands/MaintenanceCommand';
import MessagingCommand from './Commands/MessagingCommand';
import MobileCommand from './Commands/MobileCommand';
import NaviDestinationCommand from './Commands/NaviDestinationCommand';
import NotificationCommand from './Commands/NotificationCommand';
import OffroadCommand from './Commands/OffroadCommand';
import ParkingBrakeCommand from './Commands/ParkingBrakeCommand';
import ParkingTicketCommand from './Commands/ParkingTicketCommand';
import PowerTakeOffCommand from './Commands/PowerTakeOffCommand';
import RaceCommand from './Commands/RaceCommand';
import RooftopControlCommand from './Commands/RooftopControlCommand';
import SeatsCommand from './Commands/SeatsCommand';
import StartStopCommand from './Commands/StartStopCommand';
import TachographCommand from './Commands/TachographCommand';
import TextInputCommand from './Commands/TextInputCommand';
import TheftAlarmCommand from './Commands/TheftAlarmCommand';
import TrunkAccessCommand from './Commands/TrunkAccessCommand';
import UsageCommand from './Commands/UsageCommand';
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
      CruiseControlCommand,
      DashboardLightsCommand,
      DiagnosticsCommand,
      DoorLocksCommand,
      EngineCommand,
      FirmwareVersionCommand,
      FuelingCommand,
      GraphicsCommand,
      HomeChargerCommand,
      HonkHornFlashLightsCommand,
      HoodCommand,
      LightConditionsCommand,
      LightsCommand,
      MaintenanceCommand,
      MessagingCommand,
      MobileCommand,
      NaviDestinationCommand,
      NotificationCommand,
      OffroadCommand,
      ParkingBrakeCommand,
      ParkingTicketCommand,
      PowerTakeOffCommand,
      RaceCommand,
      RooftopControlCommand,
      SeatsCommand,
      StartStopCommand,
      TachographCommand,
      TextInputCommand,
      TheftAlarmCommand,
      TrunkAccessCommand,
      UsageCommand,
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
