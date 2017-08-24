var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Command from './Command';

var DiagnosticsCommand = function () {
  function DiagnosticsCommand() {
    _classCallCheck(this, DiagnosticsCommand);
  }

  _createClass(DiagnosticsCommand, null, [{
    key: 'getState',
    value: function getState() {
      return new Command([0x00, 0x33, 0x00]);
    }
  }]);

  return DiagnosticsCommand;
}();

export default DiagnosticsCommand;