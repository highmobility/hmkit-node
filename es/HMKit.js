var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import getSdkNodeBindings from './SdkNodeBindings';
var SdkNodeBindings = getSdkNodeBindings();
import { base64ToUint8, uint8ArrayToHex, hexToUint8Array } from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';
import AccessCertificate from './AccessCertificate';

var HMKit = function () {
  function HMKit(deviceCertificate, devicePrivateKey) {
    _classCallCheck(this, HMKit);

    this.deviceCertificate = deviceCertificate;
    this.devicePrivateKey = devicePrivateKey;
    this.issuer = 'tmcs';
    this.apiUrl = 'https://developers.high-mobility.com/hm_cloud/api/v1/';

    this.telematics = new Telematics(this, SdkNodeBindings);
    this.commands = new Commands(this);
    this.storage = new Storage(this);

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
        return hexToUint8Array(_this.getDeviceSerial()).buffer;
      });

      SdkNodeBindings.onGetLocalPublicKey(function () {
        return hexToUint8Array(_this.parseDeviceCertificate().publicKey).buffer;
      });

      SdkNodeBindings.onGetLocalPrivateKey(function () {
        return base64ToUint8(_this.devicePrivateKey).buffer;
      });

      SdkNodeBindings.onGetDeviceCertificate(function () {
        return base64ToUint8(_this.deviceCertificate).buffer;
      });

      SdkNodeBindings.onGetAccessCertificate(function (serial) {
        var accesCertificate = _this.getAccessCertificate(uint8ArrayToHex(new Uint8Array(serial)).toUpperCase());
        if (!accesCertificate) {
          return null;
        }

        return {
          public_key: hexToUint8Array(accesCertificate.rawAccessCertificate.accessGainingPublicKey).buffer,
          start_date: hexToUint8Array(accesCertificate.rawAccessCertificate.validityStartDate).buffer,
          end_date: hexToUint8Array(accesCertificate.rawAccessCertificate.validityEndDate).buffer,
          permissions: hexToUint8Array(accesCertificate.rawAccessCertificate.permissions).buffer
        };
      });

      SdkNodeBindings.onTelematicsSendData(this.telematics.onTelematicsSendData);
      SdkNodeBindings.onTelematicsCommandIncoming(this.telematics.onTelematicsCommandIncoming);
    }
  }, {
    key: 'getAccessCertificate',
    value: function getAccessCertificate(serial) {
      var base64AccessCertificate = this.storage.get('access_certificates', serial);

      if (!base64AccessCertificate) return null;

      return new AccessCertificate(base64ToUint8(base64AccessCertificate));
    }
  }, {
    key: 'getDeviceSerial',
    value: function getDeviceSerial() {
      return this.parseDeviceCertificate(this.deviceCertificate).deviceSerial;
    }
  }, {
    key: 'parseDeviceCertificate',
    value: function parseDeviceCertificate(certificate) {
      return {
        issuer: uint8ArrayToHex(base64ToUint8(certificate).slice(0, 4)).toUpperCase(),
        appIdentifier: uint8ArrayToHex(base64ToUint8(certificate).slice(4, 16)).toUpperCase(),
        deviceSerial: uint8ArrayToHex(base64ToUint8(certificate).slice(16, 25)).toUpperCase(),
        publicKey: uint8ArrayToHex(base64ToUint8(certificate).slice(25, 89)).toUpperCase(),
        signature: uint8ArrayToHex(base64ToUint8(certificate).slice(89, 153)).toUpperCase()
      };
    }
  }]);

  return HMKit;
}();

export default HMKit;