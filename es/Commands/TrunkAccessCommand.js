var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Command from './Command';

var TrunkAccessCommand = function () {
  function TrunkAccessCommand() {
    _classCallCheck(this, TrunkAccessCommand);
  }

  _createClass(TrunkAccessCommand, null, [{
    key: 'getState',
    value: function getState() {
      return new Command([0x00, 0x21, 0x00]);
    }
  }, {
    key: 'unlock',
    value: function unlock() {
      return new Command([0x00, 0x21, 0x02, 0x00, 0x00]);
    }
  }, {
    key: 'open',
    value: function open() {
      return new Command([0x00, 0x21, 0x02, 0x00, 0x01]);
    }
  }, {
    key: 'close',
    value: function close() {
      return new Command([0x00, 0x21, 0x02, 0x00, 0x00]);
    }
  }, {
    key: 'lock',
    value: function lock() {
      return new Command([0x00, 0x21, 0x02, 0x01, 0x00]);
    }
  }]);

  return TrunkAccessCommand;
}();

export default TrunkAccessCommand;