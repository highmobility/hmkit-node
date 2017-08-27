'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SdkNodeBindings = require('./SdkNodeBindings');

var _SdkNodeBindings2 = _interopRequireDefault(_SdkNodeBindings);

var _encoding = require('./encoding');

var _Commands = require('./Commands');

var _Commands2 = _interopRequireDefault(_Commands);

var _Telematics = require('./Telematics');

var _Telematics2 = _interopRequireDefault(_Telematics);

var _Storage = require('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var _ClientCertificate = require('./ClientCertificate');

var _ClientCertificate2 = _interopRequireDefault(_ClientCertificate);

var _AccessCertificatesManager = require('./AccessCertificatesManager');

var _AccessCertificatesManager2 = _interopRequireDefault(_AccessCertificatesManager);

var _Api = require('./Api');

var _Api2 = _interopRequireDefault(_Api);

var _ApiClient = require('./ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HMKit = function () {
  function HMKit(clientCertificate, clientPrivateKey) {
    _classCallCheck(this, HMKit);

    this.clientCertificate = new _ClientCertificate2.default((0, _encoding.base64ToUint8)(clientCertificate));
    this.clientPrivateKey = clientPrivateKey;
    this.issuer = 'tmcs';

    this.api = new _Api2.default('https://developers.high-mobility.com/hm_cloud/api/v1/');
    this.apiClient = new _ApiClient2.default();
    this.telematics = new _Telematics2.default(this);
    this.commands = new _Commands2.default(this);
    this.storage = new _Storage2.default(this);
    this.crypto = new _SdkNodeBindings2.default(this);
    this.certificates = new _AccessCertificatesManager2.default(this);
  }

  _createClass(HMKit, [{
    key: 'staging',
    value: function staging() {
      this.api = new _Api2.default('https://developers.h-m.space/hm_cloud/api/v1/');
      return this;
    }
  }, {
    key: 'downloadAccessCertificate',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.certificates.download.apply(this, args);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function downloadAccessCertificate() {
        return _ref.apply(this, arguments);
      }

      return downloadAccessCertificate;
    }()
  }]);

  return HMKit;
}();

exports.default = HMKit;