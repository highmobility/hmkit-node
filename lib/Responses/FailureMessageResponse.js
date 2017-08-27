'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autoApis = require('../autoApis');

var _autoApis2 = _interopRequireDefault(_autoApis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FailureMessageResponse = function () {
  function FailureMessageResponse(bytes) {
    _classCallCheck(this, FailureMessageResponse);

    this.api = this.getApi(bytes);
    this.type = this.getType(bytes);
    this.reason = this.getReason(bytes);
  }

  _createClass(FailureMessageResponse, [{
    key: 'getApi',
    value: function getApi(bytes) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(_autoApis2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var api = _ref2[1];

          if (api.lsb === bytes[4]) {
            return api;
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
  }, {
    key: 'getType',
    value: function getType(bytes) {
      return bytes[5];
    }
  }, {
    key: 'getReason',
    value: function getReason(bytes) {
      var reasons = {
        0: 'Unsupported Capability - Car has not the capability to perform the command',
        1: 'Unauthorised - User has not been authenticated or lacks permissions',
        2: 'Incorrect State - Command can not be executed in the current car state',
        3: 'Execution Timeout - Command failed to execute in time for an unknown reason',
        4: 'Vehicle Asleep - Car has to be waken up before the command can be used. If this is for a virtual car, the emulator has to be loaded',
        5: 'Invalid Auto Command - Auto API command not recognised'
      };

      return {
        key: bytes[6],
        value: reasons[bytes[6]]
      };
    }
  }]);

  return FailureMessageResponse;
}();

FailureMessageResponse.identifier = [0x00, 0x02];
exports.default = FailureMessageResponse;