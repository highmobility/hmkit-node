'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DoorLocksResponse = function () {
  function DoorLocksResponse(bytes) {
    _classCallCheck(this, DoorLocksResponse);

    this.doors = this.getDoorLocksState(bytes);
  }

  _createClass(DoorLocksResponse, [{
    key: 'getDoorLocksState',
    value: function getDoorLocksState(bytes) {
      var doors = {};
      var doorsCount = bytes[3];

      var positions = {
        0: 'frontLeft',
        1: 'frontRight',
        2: 'rearLeft',
        3: 'rearRight'
      };

      for (var i = 0; i < doorsCount; i++) {
        var pos = 4 + 3 * i;
        doors[positions[bytes[pos]]] = {
          position: this.getPositionValue(bytes[pos + 1]),
          lock: this.getLockValue(bytes[pos + 2])
        };
      }

      return doors;
    }
  }, {
    key: 'getPositionValue',
    value: function getPositionValue(byte) {
      return byte === 0 ? 'closed' : 'open';
    }
  }, {
    key: 'getLockValue',
    value: function getLockValue(byte) {
      return byte === 0 ? 'unlocked' : 'locked';
    }
  }]);

  return DoorLocksResponse;
}();

DoorLocksResponse.identifier = [0x00, 0x20];
exports.default = DoorLocksResponse;