'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SdkNodeBindings = require('src/SdkNodeBindings');

var _SdkNodeBindings2 = _interopRequireDefault(_SdkNodeBindings);

var _encoding = require('./encoding');

var _Commands = require('src/Commands');

var _Commands2 = _interopRequireDefault(_Commands);

var _Telematics = require('src/Telematics');

var _Telematics2 = _interopRequireDefault(_Telematics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SdkNodeBindings = (0, _SdkNodeBindings2.default)();

var HMKit = function () {
  function HMKit(deviceCertificate, devicePrivateKey, issuerPublicKey) {
    _classCallCheck(this, HMKit);

    this.deviceCertificate = deviceCertificate;
    this.devicePrivateKey = devicePrivateKey;
    this.issuerPublicKey = issuerPublicKey;
    this.issuer = 'tmcs';
    this.apiUrl = 'https://developers.h-m.space/hm_cloud/api/v1/';

    this.telematics = new _Telematics2.default(this, SdkNodeBindings);
    this.commands = new _Commands2.default(this);

    this.setupSdkNodeBindings();
  }

  _createClass(HMKit, [{
    key: 'staging',
    value: function staging() {
      return this.api('https://developers.h-m.space/hm_cloud/api/v1/');
    }
  }, {
    key: 'api',
    value: function api(url) {
      this.apiUrl = url;

      return this;
    }
  }, {
    key: 'setupSdkNodeBindings',
    value: function setupSdkNodeBindings() {
      var _this = this;

      SdkNodeBindings.onGetSerialNumber(function () {
        return (0, _encoding.hexToUint8Array)(_this.getDeviceSerial()).buffer;
      });

      SdkNodeBindings.onGetLocalPublicKey(function () {
        return (0, _encoding.hexToUint8Array)(_this.parseDeviceCertificate().publicKey).buffer;
      });

      SdkNodeBindings.onGetLocalPrivateKey(function () {
        return (0, _encoding.base64ToUint8)(_this.devicePrivateKey).buffer;
      });
      SdkNodeBindings.onGetDeviceCertificate(function () {
        return (0, _encoding.base64ToUint8)(_this.deviceCertificate).buffer;
      });

      SdkNodeBindings.onGetCAPublicKey(function () {
        return (0, _encoding.base64ToUint8)(_this.issuerPublicKey).buffer;
      });

      SdkNodeBindings.onGetAccessCertificate(function (serial) {
        var base64AccessCertificate = _this.getAccessCertificate(serial);
        if (!base64AccessCertificate) {
          return null;
        }

        var accessCertificate = _this.parseAccessCertificate(base64AccessCertificate);

        return {
          public_key: (0, _encoding.hexToUint8Array)(accessCertificate.accessGainingPublicKey).buffer,
          start_date: (0, _encoding.hexToUint8Array)(accessCertificate.validityStartDate).buffer,
          end_date: (0, _encoding.hexToUint8Array)(accessCertificate.validityEndDate).buffer,
          permissions: (0, _encoding.hexToUint8Array)(accessCertificate.permissions).buffer
        };
      });

      SdkNodeBindings.onTelematicsSendData(this.telematics.onTelematicsSendData);
      SdkNodeBindings.onTelematicsCommandIncoming(this.telematics.onTelematicsCommandIncoming);
    }
  }, {
    key: 'getAccessCertificate',
    value: function getAccessCertificate(serial) {
      return 'NWZ10Mx2qP/1Cyor14dHY2EpjKLpLUAEJjgGwQeA0yy3/tsSvKLFKSfrK/5YnEvrhxj9gCDbrodBcwIoJxVIc6nv/571FDWjAcX/U8uWPy3SVhEICwwAEQkLDAAHEAf//f/v/0kaWqwyti6brrWzLdDXBVq+nF5E3VXTnovwCHrw8rWekqFvgqruIR2+wWqmZc/Y2X4iE2lmWksZQEExR4Kj/2Y=';
    }
  }, {
    key: 'getDeviceSerial',
    value: function getDeviceSerial() {
      return this.parseDeviceCertificate(this.deviceCertificate).deviceSerial;
    }
  }, {
    key: 'parseAccessCertificate',
    value: function parseAccessCertificate(certificate) {
      var permissionsSize = (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(92, 93)).toUpperCase();
      return {
        accessGainingSerialNumber: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(0, 9)).toUpperCase(),
        accessGainingPublicKey: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(9, 73)).toUpperCase(),
        accessProvidingSerialNumber: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(73, 82)).toUpperCase(),
        validityStartDate: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(82, 87)).toUpperCase(),
        validityEndDate: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(87, 92)).toUpperCase(),
        permissionsSize: permissionsSize,
        permissions: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(93, 93 + (0, _encoding.hexToInt)(permissionsSize))).toUpperCase(),
        signature: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(93 + (0, _encoding.hexToInt)(permissionsSize), 93 + (0, _encoding.hexToInt)(permissionsSize) + 64)).toUpperCase()
      };
    }
  }, {
    key: 'parseDeviceCertificate',
    value: function parseDeviceCertificate(certificate) {
      return {
        issuer: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(0, 4)).toUpperCase(),
        appIdentifier: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(4, 16)).toUpperCase(),
        deviceSerial: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(16, 25)).toUpperCase(),
        publicKey: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(25, 89)).toUpperCase(),
        signature: (0, _encoding.uint8ArrayToHex)((0, _encoding.base64ToUint8)(certificate).slice(89, 153)).toUpperCase()
      };
    }
  }]);

  return HMKit;
}();

exports.default = HMKit;