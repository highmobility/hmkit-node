var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import getSdkNodeBindings from './SdkNodeBindings';
var SdkNodeBindings = getSdkNodeBindings();
import { base64ToUint8, uint8ArrayToHex, hexToInt, hexToUint8Array } from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';

var HMKit = function () {
  function HMKit(deviceCertificate, devicePrivateKey) {
    _classCallCheck(this, HMKit);

    this.deviceCertificate = deviceCertificate;
    this.devicePrivateKey = devicePrivateKey;
    this.issuer = 'tmcs';
    this.apiUrl = 'https://developers.h-m.space/hm_cloud/api/v1/';

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
        var base64AccessCertificate = _this.getAccessCertificate(uint8ArrayToHex(new Uint8Array(serial)).toUpperCase());
        if (!base64AccessCertificate) {
          return null;
        }

        var accessCertificate = _this.parseAccessCertificate(base64AccessCertificate);

        return {
          public_key: hexToUint8Array(accessCertificate.accessGainingPublicKey).buffer,
          start_date: hexToUint8Array(accessCertificate.validityStartDate).buffer,
          end_date: hexToUint8Array(accessCertificate.validityEndDate).buffer,
          permissions: hexToUint8Array(accessCertificate.permissions).buffer
        };
      });

      SdkNodeBindings.onTelematicsSendData(this.telematics.onTelematicsSendData);
      SdkNodeBindings.onTelematicsCommandIncoming(this.telematics.onTelematicsCommandIncoming);
    }
  }, {
    key: 'getAccessCertificate',
    value: function getAccessCertificate(serial) {
      return this.storage.get('access_certificates', serial);
    }
  }, {
    key: 'getDeviceSerial',
    value: function getDeviceSerial() {
      return this.parseDeviceCertificate(this.deviceCertificate).deviceSerial;
    }
  }, {
    key: 'parseAccessCertificate',
    value: function parseAccessCertificate(certificate) {
      var permissionsSize = uint8ArrayToHex(base64ToUint8(certificate).slice(92, 93)).toUpperCase();
      return {
        accessGainingSerialNumber: uint8ArrayToHex(base64ToUint8(certificate).slice(0, 9)).toUpperCase(),
        accessGainingPublicKey: uint8ArrayToHex(base64ToUint8(certificate).slice(9, 73)).toUpperCase(),
        accessProvidingSerialNumber: uint8ArrayToHex(base64ToUint8(certificate).slice(73, 82)).toUpperCase(),
        validityStartDate: uint8ArrayToHex(base64ToUint8(certificate).slice(82, 87)).toUpperCase(),
        validityEndDate: uint8ArrayToHex(base64ToUint8(certificate).slice(87, 92)).toUpperCase(),
        permissionsSize: permissionsSize,
        permissions: uint8ArrayToHex(base64ToUint8(certificate).slice(93, 93 + hexToInt(permissionsSize))).toUpperCase(),
        signature: uint8ArrayToHex(base64ToUint8(certificate).slice(93 + hexToInt(permissionsSize), 93 + hexToInt(permissionsSize) + 64)).toUpperCase()
      };
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