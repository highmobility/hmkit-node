var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { ieee754ToBase10 } from '../encoding';

var VehicleLocationResponse = function () {
  function VehicleLocationResponse(bytes) {
    _classCallCheck(this, VehicleLocationResponse);

    if (bytes[2] === 0x01) {
      this.vehicleLocation(bytes);
    } else {
      this.vehicleState(bytes);
    }
  }

  _createClass(VehicleLocationResponse, [{
    key: 'vehicleLocation',
    value: function vehicleLocation(bytes) {
      this.latitude = this.getLatitude(bytes);
      this.longitude = this.getLongitude(bytes);
    }
  }, {
    key: 'vehicleState',
    value: function vehicleState() {
      throw new Error('Get vehicle state not handled');
    }
  }, {
    key: 'getLatitude',
    value: function getLatitude(bytes) {
      return ieee754ToBase10([bytes[3], bytes[4], bytes[5], bytes[6]]);
    }
  }, {
    key: 'getLongitude',
    value: function getLongitude(bytes) {
      return ieee754ToBase10([bytes[7], bytes[8], bytes[9], bytes[10]]);
    }
  }]);

  return VehicleLocationResponse;
}();

VehicleLocationResponse.identifier = [0x00, 0x30];
export default VehicleLocationResponse;