import BrowserCommand from './Commands/BrowserCommand';
import CapabilitiesCommand from './Commands/CapabilitiesCommand';
import ChargingCommand from './Commands/ChargingCommand';
import ClimateCommand from './Commands/ClimateCommand';
import DiagnosticsCommand from './Commands/DiagnosticsCommand';
import DoorLocksCommand from './Commands/DoorLocksCommand';
import EngineCommand from './Commands/EngineCommand';
import HonkHornsFlashLightsCommand from './Commands/HonkHornsFlashLightsCommand';
import LightsCommand from './Commands/LightsCommand';
import MaintenanceCommand from './Commands/MaintenanceCommand';
import MessagingCommand from './Commands/MessagingCommand';
import NotificationCommand from './Commands/NotificationCommand';
import RooftopControlCommand from './Commands/RooftopControlCommand';
import TrunkAccessCommand from './Commands/TrunkAccessCommand';
import ValetModeCommand from './Commands/ValetModeCommand';
import VehicleLocationCommand from './Commands/VehicleLocationCommand';
import VehicleStatusCommand from './Commands/VehicleStatusCommand';
import VideoHandoverCommand from './Commands/VideoHandoverCommand';
import WakeUpCommand from './Commands/WakeUpCommand';
import WindowsCommand from './Commands/WindowsCommand';

export default class Commands {
  constructor() {
    Object.assign(this, {
      BrowserCommand,
      CapabilitiesCommand,
      ChargingCommand,
      ClimateCommand,
      DiagnosticsCommand,
      DoorLocksCommand,
      EngineCommand,
      HonkHornsFlashLightsCommand,
      LightsCommand,
      MaintenanceCommand,
      MessagingCommand,
      NotificationCommand,
      RooftopControlCommand,
      TrunkAccessCommand,
      ValetModeCommand,
      VehicleLocationCommand,
      VehicleStatusCommand,
      VideoHandoverCommand,
      WakeUpCommand,
      WindowsCommand,
    });
  }
}
