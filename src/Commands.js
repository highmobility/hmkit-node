import CapabilitiesCommand from './Commands/CapabilitiesCommand';
import DiagnosticsCommand from './Commands/DiagnosticsCommand';
import DoorLocksCommand from './Commands/DoorLocksCommand';
import EngineCommand from './Commands/EngineCommand';
import TrunkAccessCommand from './Commands/TrunkAccessCommand';
import VehicleLocationCommand from './Commands/VehicleLocationCommand';
import VehicleStatusCommand from './Commands/VehicleStatusCommand';

export default class Commands {
  constructor() {
    Object.assign(this, {
      CapabilitiesCommand,
      DiagnosticsCommand,
      DoorLocksCommand,
      EngineCommand,
      TrunkAccessCommand,
      VehicleLocationCommand,
      VehicleStatusCommand,
    });
  }
}
