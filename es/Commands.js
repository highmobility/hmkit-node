function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import CapabilitiesCommand from './Commands/CapabilitiesCommand';
import DiagnosticsCommand from './Commands/DiagnosticsCommand';
import DoorLocksCommand from './Commands/DoorLocksCommand';
import EngineCommand from './Commands/EngineCommand';
import VehicleLocationCommand from './Commands/VehicleLocationCommand';
import VehicleStatusCommand from './Commands/VehicleStatusCommand';

var Commands = function Commands() {
  _classCallCheck(this, Commands);

  Object.assign(this, {
    CapabilitiesCommand: CapabilitiesCommand,
    DiagnosticsCommand: DiagnosticsCommand,
    DoorLocksCommand: DoorLocksCommand,
    EngineCommand: EngineCommand,
    VehicleLocationCommand: VehicleLocationCommand,
    VehicleStatusCommand: VehicleStatusCommand
  });
};

export default Commands;