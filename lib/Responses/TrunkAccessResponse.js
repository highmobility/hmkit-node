'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrunkAccessResponse = function () {
  function TrunkAccessResponse(bytes) {
    _classCallCheck(this, TrunkAccessResponse);

    this.lock = this.getLockState(bytes);
    this.position = this.getPositionState(bytes);
  }

  _createClass(TrunkAccessResponse, [{
    key: 'getLockState',
    value: function getLockState(bytes) {
      return bytes[3] === 0 ? 'unlocked' : 'locked';
    }
  }, {
    key: 'getPositionState',
    value: function getPositionState(bytes) {
      return bytes[4] === 0 ? 'closed' : 'open';
    }
  }]);

  return TrunkAccessResponse;
}();

TrunkAccessResponse.identifier = [0x00, 0x21];
exports.default = TrunkAccessResponse;