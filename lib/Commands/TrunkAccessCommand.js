'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Command = require('./Command');

var _Command2 = _interopRequireDefault(_Command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrunkAccessCommand = function () {
  function TrunkAccessCommand() {
    _classCallCheck(this, TrunkAccessCommand);
  }

  _createClass(TrunkAccessCommand, null, [{
    key: 'getState',
    value: function getState() {
      return new _Command2.default([0x00, 0x21, 0x00]);
    }
  }, {
    key: 'unlock',
    value: function unlock() {
      return new _Command2.default([0x00, 0x21, 0x02, 0x00, 0x00]);
    }
  }, {
    key: 'open',
    value: function open() {
      return new _Command2.default([0x00, 0x21, 0x02, 0x00, 0x01]);
    }
  }, {
    key: 'close',
    value: function close() {
      return new _Command2.default([0x00, 0x21, 0x02, 0x00, 0x00]);
    }
  }, {
    key: 'lock',
    value: function lock() {
      return new _Command2.default([0x00, 0x21, 0x02, 0x01, 0x00]);
    }
  }]);

  return TrunkAccessCommand;
}();

exports.default = TrunkAccessCommand;