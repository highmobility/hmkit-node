var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import DiagnosticsResponse from './DiagnosticsResponse';
import DoorLocksResponse from './DoorLocksResponse';
import EngineResponse from './EngineResponse';
import EmptyResponse from './EmptyResponse';
import FailureMessageResponse from './FailureMessageResponse';
import MaintenanceResponse from './MaintenanceResponse';
import TrunkAccessResponse from './TrunkAccessResponse';
import VehicleLocationResponse from './VehicleLocationResponse';

var Response = function () {
  function Response(data) {
    _classCallCheck(this, Response);

    this.rawData = data;
    this.checkRawDataLength();

    this.parsers = [DiagnosticsResponse, DoorLocksResponse, EngineResponse, FailureMessageResponse, MaintenanceResponse, TrunkAccessResponse, VehicleLocationResponse];
  }

  _createClass(Response, [{
    key: 'checkRawDataLength',
    value: function checkRawDataLength() {
      if (this.rawData.length < 2 && this.rawData.length !== 0) {
        throw new Error('Response string length invalid (length: ' + this.rawData.length + ' chars).');
      }
    }
  }, {
    key: 'bytes',
    value: function bytes() {
      return this.rawData;
    }
  }, {
    key: 'parse',
    value: function parse() {
      var bytes = this.bytes();
      var Parser = this.findParser(bytes);

      if (!Parser) {
        if (bytes.length === 0) return new EmptyResponse();
        return bytes;
      }

      return new Parser(bytes);
    }
  }, {
    key: 'findParser',
    value: function findParser(bytes) {
      if (bytes.length === 0) {
        return null;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.parsers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parser = _step.value;

          if (parser.identifier[0] === bytes[0] && parser.identifier[1] === bytes[1]) {
            return parser;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }]);

  return Response;
}();

export default Response;