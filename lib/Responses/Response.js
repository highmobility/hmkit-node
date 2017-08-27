'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DiagnosticsResponse = require('./DiagnosticsResponse');

var _DiagnosticsResponse2 = _interopRequireDefault(_DiagnosticsResponse);

var _DoorLocksResponse = require('./DoorLocksResponse');

var _DoorLocksResponse2 = _interopRequireDefault(_DoorLocksResponse);

var _EngineResponse = require('./EngineResponse');

var _EngineResponse2 = _interopRequireDefault(_EngineResponse);

var _TrunkAccessResponse = require('./TrunkAccessResponse');

var _TrunkAccessResponse2 = _interopRequireDefault(_TrunkAccessResponse);

var _VehicleLocationResponse = require('./VehicleLocationResponse');

var _VehicleLocationResponse2 = _interopRequireDefault(_VehicleLocationResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
  function Response(data) {
    _classCallCheck(this, Response);

    this.rawData = data;
    this.checkRawDataLength();

    this.parsers = [_DiagnosticsResponse2.default, _DoorLocksResponse2.default, _EngineResponse2.default, _TrunkAccessResponse2.default, _VehicleLocationResponse2.default];
  }

  _createClass(Response, [{
    key: 'checkRawDataLength',
    value: function checkRawDataLength() {
      if (this.rawData.length < 2) {
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
        return bytes;
      }

      return new Parser(bytes);
    }
  }, {
    key: 'findParser',
    value: function findParser(bytes) {
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

exports.default = Response;