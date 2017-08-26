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

var _AccessCertificate = require('./AccessCertificate');

var _AccessCertificate2 = _interopRequireDefault(_AccessCertificate);

var _DeviceCertificate = require('./DeviceCertificate');

var _DeviceCertificate2 = _interopRequireDefault(_DeviceCertificate);

var _Api = require('./Api');

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HMKit = function () {
  function HMKit(deviceCertificate, devicePrivateKey) {
    _classCallCheck(this, HMKit);

    this.deviceCertificate = new _DeviceCertificate2.default((0, _encoding.base64ToUint8)(deviceCertificate));
    this.devicePrivateKey = devicePrivateKey;
    this.issuer = 'tmcs';

    this.api = new _Api2.default('https://developers.high-mobility.com/hm_cloud/api/v1/');
    this.telematics = new _Telematics2.default(this);
    this.commands = new _Commands2.default(this);
    this.storage = new _Storage2.default(this);
    this.crypto = new _SdkNodeBindings2.default(this);
  }

  _createClass(HMKit, [{
    key: 'staging',
    value: function staging() {
      this.api = new _Api2.default('https://developers.h-m.space/hm_cloud/api/v1/');
      return this;
    }
  }, {
    key: 'getAccessCertificate',
    value: function getAccessCertificate(serial) {
      var base64AccessCertificate = this.storage.get('access_certificates', serial);

      if (!base64AccessCertificate) return null;

      return new _AccessCertificate2.default((0, _encoding.base64ToUint8)(base64AccessCertificate));
    }
  }]);

  return HMKit;
}();

exports.default = HMKit;