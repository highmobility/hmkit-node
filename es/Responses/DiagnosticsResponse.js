var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { bytesSum } from '../helpers';
import { ieee754ToBase10 } from '../encoding';

var DiagnosticsResponse = function () {
  function DiagnosticsResponse(bytes) {
    _classCallCheck(this, DiagnosticsResponse);

    if (bytes[2] === 0x01) {
      this.diagnosticsState(bytes);
    } else {
      this.vehicleState(bytes);
    }
  }

  _createClass(DiagnosticsResponse, [{
    key: 'diagnosticsState',
    value: function diagnosticsState(bytes) {
      this.mileage = this.getMileage(bytes);
      this.engineOilTemperature = this.getEngineOilTemperature(bytes);
      this.speed = this.getSpeed(bytes);
      this.engineRPM = this.getEngineRPM(bytes);
      this.fuelLevel = this.getFuelLevel(bytes);
      this.washerFluidLevel = this.getWasherFluidLevel(bytes);
      this.tires = this.getTires(bytes);
    }
  }, {
    key: 'vehicleState',
    value: function vehicleState() {
      throw new Error('Get vehicle state not handled');
    }
  }, {
    key: 'getMileage',
    value: function getMileage(bytes) {
      return bytesSum([bytes[3], bytes[4], bytes[5]]);
    }
  }, {
    key: 'getEngineOilTemperature',
    value: function getEngineOilTemperature(bytes) {
      return bytesSum([bytes[6], bytes[7]]);
    }
  }, {
    key: 'getSpeed',
    value: function getSpeed(bytes) {
      return bytesSum([bytes[8], bytes[9]]);
    }
  }, {
    key: 'getEngineRPM',
    value: function getEngineRPM(bytes) {
      return bytesSum([bytes[10], bytes[11]]);
    }
  }, {
    key: 'getFuelLevel',
    value: function getFuelLevel(bytes) {
      return bytesSum([bytes[12]]);
    }
  }, {
    key: 'getWasherFluidLevel',
    value: function getWasherFluidLevel(bytes) {
      return bytes[13] === 1 ? 'filled' : 'low';
    }
  }, {
    key: 'getTires',
    value: function getTires(bytes) {
      var tires = {};
      var tiresCount = bytes[14];

      var positions = {
        0: 'frontLeft',
        1: 'frontRight',
        2: 'rearLeft',
        3: 'rearRight'
      };

      for (var i = 0; i < tiresCount; i++) {
        var pos = 15 + 5 * i;
        tires[positions[bytes[pos]]] = ieee754ToBase10([bytes[pos + 1], bytes[pos + 2], bytes[pos + 3], bytes[pos + 4]]);
      }

      return tires;
    }
  }]);

  return DiagnosticsResponse;
}();

DiagnosticsResponse.identifier = [0x00, 0x33];
export default DiagnosticsResponse;