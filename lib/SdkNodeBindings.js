'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _encoding = require('./encoding');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SdkNodeBindings = function () {
  function SdkNodeBindings(hmkit) {
    _classCallCheck(this, SdkNodeBindings);

    this.hmkit = hmkit;
    this.mergeNativeMethods(this.loadNativeAddOn());
    this.setup();
  }

  _createClass(SdkNodeBindings, [{
    key: 'mergeNativeMethods',
    value: function mergeNativeMethods(addon) {
      var _this = this;

      Object.getOwnPropertyNames(addon).forEach(function (method) {
        _this[method] = addon[method];
      });
    }
  }, {
    key: 'loadNativeAddOn',
    value: function loadNativeAddOn() {
      if (_fs2.default.existsSync(_path2.default.resolve(__dirname, '..', 'sdk-node-bindings', 'lib', 'binding.js'))) {
        return require('../sdk-node-bindings/lib/binding.js');
      } else if (process.platform === 'darwin') {
        return require('../bindings/macos');
      } else if (process.platform === 'linux') {
        return require('../bindings/ubuntu');
      }

      throw new Error('Native "hmkit" addon missing for your platform.');
    }
  }, {
    key: 'setup',
    value: function setup() {
      var _this2 = this;

      this.onGetSerialNumber(function () {
        return (0, _encoding.hexToUint8Array)(_this2.hmkit.deviceCertificate.getSerial()).buffer;
      });
      this.onGetLocalPublicKey(function () {
        return (0, _encoding.hexToUint8Array)(_this2.hmkit.deviceCertificate.get().publicKey).buffer;
      });
      this.onGetLocalPrivateKey(function () {
        return (0, _encoding.base64ToUint8)(_this2.hmkit.devicePrivateKey).buffer;
      });
      this.onGetDeviceCertificate(function () {
        return (0, _encoding.base64ToUint8)(_this2.hmkit.deviceCertificate).buffer;
      });

      this.onGetAccessCertificate(function (serial) {
        var accesCertificate = _this2.hmkit.certificates.get((0, _encoding.uint8ArrayToHex)(new Uint8Array(serial)).toUpperCase());
        if (!accesCertificate) {
          return null;
        }

        return {
          public_key: (0, _encoding.hexToUint8Array)(accesCertificate.rawAccessCertificate.accessGainingPublicKey).buffer,
          start_date: (0, _encoding.hexToUint8Array)(accesCertificate.rawAccessCertificate.validityStartDate).buffer,
          end_date: (0, _encoding.hexToUint8Array)(accesCertificate.rawAccessCertificate.validityEndDate).buffer,
          permissions: (0, _encoding.hexToUint8Array)(accesCertificate.rawAccessCertificate.permissions).buffer
        };
      });

      this.onTelematicsSendData(this.hmkit.telematics.onTelematicsSendData);
      this.onTelematicsCommandIncoming(this.hmkit.telematics.onTelematicsCommandIncoming);
    }
  }]);

  return SdkNodeBindings;
}();

exports.default = SdkNodeBindings;