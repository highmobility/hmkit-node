import BrowserCommand from './Commands/BrowserCommand';
import CapabilitiesCommand from './Commands/CapabilitiesCommand';
import ChargingCommand from './Commands/ChargingCommand';
import DiagnosticsCommand from './Commands/DiagnosticsCommand';
import DoorLocksCommand from './Commands/DoorLocksCommand';
import EngineCommand from './Commands/EngineCommand';
import LightsCommand from './Commands/LightsCommand';
import MaintenanceCommand from './Commands/MaintenanceCommand';
import NotificationCommand from './Commands/NotificationCommand';
import RooftopControlCommand from './Commands/RooftopControlCommand';
import TrunkAccessCommand from './Commands/TrunkAccessCommand';
import ValetModeCommand from './Commands/ValetModeCommand';
import VehicleLocationCommand from './Commands/VehicleLocationCommand';
import VehicleStatusCommand from './Commands/VehicleStatusCommand';
import WakeUpCommand from './Commands/WakeUpCommand';

export default class Commands {
  constructor() {
    Object.assign(this, {
      BrowserCommand,
      CapabilitiesCommand,
      ChargingCommand,
      DiagnosticsCommand,
      DoorLocksCommand,
      EngineCommand,
      LightsCommand,
      MaintenanceCommand,
      NotificationCommand,
      RooftopControlCommand,
      TrunkAccessCommand,
      ValetModeCommand,
      VehicleLocationCommand,
      VehicleStatusCommand,
      WakeUpCommand,
    });
  }
}
