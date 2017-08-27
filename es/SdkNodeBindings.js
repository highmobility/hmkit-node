var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import fs from 'fs';
import path from 'path';
import { base64ToUint8, uint8ArrayToHex, hexToUint8Array } from './encoding';

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
      if (fs.existsSync(path.resolve(__dirname, '..', 'sdk-node-bindings', 'lib', 'binding.js'))) {
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
        return hexToUint8Array(_this2.hmkit.clientCertificate.getSerial()).buffer;
      });
      this.onGetLocalPublicKey(function () {
        return hexToUint8Array(_this2.hmkit.clientCertificate.get().publicKey).buffer;
      });
      this.onGetLocalPrivateKey(function () {
        return base64ToUint8(_this2.hmkit.clientPrivateKey).buffer;
      });
      this.onGetDeviceCertificate(function () {
        return base64ToUint8(_this2.hmkit.clientCertificate).buffer;
      });

      this.onGetAccessCertificate(function (serial) {
        var accesCertificate = _this2.hmkit.certificates.get(uint8ArrayToHex(new Uint8Array(serial)).toUpperCase());
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

      this.onTelematicsSendData(this.hmkit.telematics.onTelematicsSendData);
      this.onTelematicsCommandIncoming(this.hmkit.telematics.onTelematicsCommandIncoming);
    }
  }]);

  return SdkNodeBindings;
}();

export default SdkNodeBindings;