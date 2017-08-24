import CapabilitiesCommand from './Commands/CapabilitiesCommand';
import DiagnosticsCommand from './Commands/DiagnosticsCommand';
import EngineCommand from './Commands/EngineCommand';
import VehicleLocationCommand from './Commands/VehicleLocationCommand';
import VehicleStatusCommand from './Commands/VehicleStatusCommand';

export default class Commands {
  constructor() {
    Object.assign(this, {
      CapabilitiesCommand,
      DiagnosticsCommand,
      EngineCommand,
      VehicleLocationCommand,
      VehicleStatusCommand,
    });
  }
}
