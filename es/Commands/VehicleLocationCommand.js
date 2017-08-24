var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Command from './Command';

var VehicleLocationCommand = function () {
  function VehicleLocationCommand() {
    _classCallCheck(this, VehicleLocationCommand);
  }

  _createClass(VehicleLocationCommand, null, [{
    key: 'get',
    value: function get() {
      return new Command([0x00, 0x30, 0x00]);
    }
  }]);

  return VehicleLocationCommand;
}();

export default VehicleLocationCommand;