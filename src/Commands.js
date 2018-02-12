import BrowserCommand from './Commands/BrowserCommand';
import CapabilitiesCommand from './Commands/CapabilitiesCommand';
import ChargingCommand from './Commands/ChargingCommand';
import ChassisSettingsCommand from './Commands/ChassisSettingsCommand';
import ClimateCommand from './Commands/ClimateCommand';
import DiagnosticsCommand from './Commands/DiagnosticsCommand';
import DoorLocksCommand from './Commands/DoorLocksCommand';
import EngineCommand from './Commands/EngineCommand';
import FuelingCommand from './Commands/FuelingCommand';
import GraphicsCommand from './Commands/GraphicsCommand';
import HonkHornsFlashLightsCommand from './Commands/HonkHornsFlashLightsCommand';
import KeyfobPositionCommand from './Commands/KeyfobPositionCommand';
import LightsCommand from './Commands/LightsCommand';
import MaintenanceCommand from './Commands/MaintenanceCommand';
import MessagingCommand from './Commands/MessagingCommand';
import NaviDestinationCommand from './Commands/NaviDestinationCommand';
import NotificationCommand from './Commands/NotificationCommand';
import ParkingTicketCommand from './Commands/ParkingTicketCommand';
import RooftopControlCommand from './Commands/RooftopControlCommand';
import TextInputCommand from './Commands/TextInputCommand';
import TheftAlarmCommand from './Commands/TheftAlarmCommand';
import TrunkAccessCommand from './Commands/TrunkAccessCommand';
import ValetModeCommand from './Commands/ValetModeCommand';
import VehicleLocationCommand from './Commands/VehicleLocationCommand';
import VehicleStatusCommand from './Commands/VehicleStatusCommand';
import VehicleTimeCommand from './Commands/VehicleTimeCommand';
import VideoHandoverCommand from './Commands/VideoHandoverCommand';
import WakeUpCommand from './Commands/WakeUpCommand';
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
      FuelingCommand,
      GraphicsCommand,
      HonkHornsFlashLightsCommand,
      KeyfobPositionCommand,
      LightsCommand,
      MaintenanceCommand,
      MessagingCommand,
      NaviDestinationCommand,
      NotificationCommand,
      ParkingTicketCommand,
      RooftopControlCommand,
      TextInputCommand,
      TheftAlarmCommand,
      TrunkAccessCommand,
      ValetModeCommand,
      VehicleLocationCommand,
      VehicleStatusCommand,
      VehicleTimeCommand,
      VideoHandoverCommand,
      WakeUpCommand,
      WindowsCommand,
      WindscreenCommand,
    });
  }
}
