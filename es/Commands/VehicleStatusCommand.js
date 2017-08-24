var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Command from './Command';

var VehicleStatusCommand = function () {
  function VehicleStatusCommand() {
    _classCallCheck(this, VehicleStatusCommand);
  }

  _createClass(VehicleStatusCommand, null, [{
    key: 'get',
    value: function get() {
      return new Command([0x00, 0x11, 0x00]);
    }
  }]);

  return VehicleStatusCommand;
}();

export default VehicleStatusCommand;