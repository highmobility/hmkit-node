import CapabilitiesCommand from 'src/Commands/CapabilitiesCommand';
import DiagnosticsCommand from 'src/Commands/DiagnosticsCommand';
import EngineCommand from 'src/Commands/EngineCommand';
import VehicleLocationCommand from 'src/Commands/VehicleLocationCommand';
import VehicleStatusCommand from 'src/Commands/VehicleStatusCommand';

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
