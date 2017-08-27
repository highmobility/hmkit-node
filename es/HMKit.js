var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import SdkNodeBindings from './SdkNodeBindings';
import { base64ToUint8 } from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';
import DeviceCertificate from './DeviceCertificate';
import AccessCertificatesManager from './AccessCertificatesManager';
import Api from './Api';
import ApiClient from './ApiClient';

var HMKit = function () {
  function HMKit(deviceCertificate, devicePrivateKey) {
    _classCallCheck(this, HMKit);

    this.deviceCertificate = new DeviceCertificate(base64ToUint8(deviceCertificate));
    this.devicePrivateKey = devicePrivateKey;
    this.issuer = 'tmcs';

    this.api = new Api('https://developers.high-mobility.com/hm_cloud/api/v1/');
    this.apiClient = new ApiClient();
    this.telematics = new Telematics(this);
    this.commands = new Commands(this);
    this.storage = new Storage(this);
    this.crypto = new SdkNodeBindings(this);
    this.certificates = new AccessCertificatesManager(this);
  }

  _createClass(HMKit, [{
    key: 'staging',
    value: function staging() {
      this.api = new Api('https://developers.h-m.space/hm_cloud/api/v1/');
      return this;
    }
  }, {
    key: 'downloadAccessCertificate',
    value: function downloadAccessCertificate() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.certificates.download.apply(this, args);
    }
  }]);

  return HMKit;
}();

export default HMKit;