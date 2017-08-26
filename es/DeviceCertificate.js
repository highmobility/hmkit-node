var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { uint8ArrayToHex } from './encoding';

var DeviceCertificate = function () {
  function DeviceCertificate(bytes) {
    _classCallCheck(this, DeviceCertificate);

    this.bytes = bytes;
    this.rawDeviceCertificate = this.parse(bytes);
    this.issuer = this.rawDeviceCertificate.issuer;
    this.appIdentifier = this.getAppId();
    this.deviceSerial = this.getSerial();
    this.publicKey = this.rawDeviceCertificate.publicKey;
    this.signature = this.rawDeviceCertificate.signature;
    this.deviceCertificate = this.get();
  }

  _createClass(DeviceCertificate, [{
    key: 'parse',
    value: function parse(bytes) {
      return {
        issuer: uint8ArrayToHex(bytes.slice(0, 4)).toUpperCase(),
        appIdentifier: uint8ArrayToHex(bytes.slice(4, 16)).toUpperCase(),
        deviceSerial: uint8ArrayToHex(bytes.slice(16, 25)).toUpperCase(),
        publicKey: uint8ArrayToHex(bytes.slice(25, 89)).toUpperCase(),
        signature: uint8ArrayToHex(bytes.slice(89, 153)).toUpperCase()
      };
    }
  }, {
    key: 'get',
    value: function get() {
      return {
        issuer: this.issuer,
        appIdentifier: this.appIdentifier,
        deviceSerial: this.deviceSerial,
        publicKey: this.publicKey
      };
    }
  }, {
    key: 'getSerial',
    value: function getSerial() {
      return this.rawDeviceCertificate.deviceSerial;
    }
  }, {
    key: 'getAppId',
    value: function getAppId() {
      return this.rawDeviceCertificate.appIdentifier;
    }
  }]);

  return DeviceCertificate;
}();

export default DeviceCertificate;