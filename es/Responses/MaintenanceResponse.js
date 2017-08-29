var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { bytesSum } from '../helpers';

var MaintenanceResponse = function () {
  function MaintenanceResponse(bytes) {
    _classCallCheck(this, MaintenanceResponse);

    this.daysToNextService = this.getDaysToNextService(bytes);
    this.kilometersToNextService = this.getKilometersToNextService(bytes);
  }

  _createClass(MaintenanceResponse, [{
    key: 'getDaysToNextService',
    value: function getDaysToNextService(bytes) {
      return bytesSum([bytes[3], bytes[4]]);
    }
  }, {
    key: 'getKilometersToNextService',
    value: function getKilometersToNextService(bytes) {
      return bytesSum([bytes[5], bytes[6], bytes[7]]);
    }
  }]);

  return MaintenanceResponse;
}();

MaintenanceResponse.identifier = [0x00, 0x34];
export default MaintenanceResponse;