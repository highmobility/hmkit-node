'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CapabilitiesCommand = require('./Commands/CapabilitiesCommand');

var _CapabilitiesCommand2 = _interopRequireDefault(_CapabilitiesCommand);

var _DiagnosticsCommand = require('./Commands/DiagnosticsCommand');

var _DiagnosticsCommand2 = _interopRequireDefault(_DiagnosticsCommand);

var _EngineCommand = require('./Commands/EngineCommand');

var _EngineCommand2 = _interopRequireDefault(_EngineCommand);

var _VehicleLocationCommand = require('./Commands/VehicleLocationCommand');

var _VehicleLocationCommand2 = _interopRequireDefault(_VehicleLocationCommand);

var _VehicleStatusCommand = require('./Commands/VehicleStatusCommand');

var _VehicleStatusCommand2 = _interopRequireDefault(_VehicleStatusCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Commands = function Commands() {
  _classCallCheck(this, Commands);

  Object.assign(this, {
    CapabilitiesCommand: _CapabilitiesCommand2.default,
    DiagnosticsCommand: _DiagnosticsCommand2.default,
    EngineCommand: _EngineCommand2.default,
    VehicleLocationCommand: _VehicleLocationCommand2.default,
    VehicleStatusCommand: _VehicleStatusCommand2.default
  });
};

exports.default = Commands;