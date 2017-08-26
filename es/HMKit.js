var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import SdkNodeBindings from './SdkNodeBindings';
import { base64ToUint8 } from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';
import AccessCertificate from './AccessCertificate';
import DeviceCertificate from './DeviceCertificate';

var HMKit = function () {
  function HMKit(deviceCertificate, devicePrivateKey) {
    _classCallCheck(this, HMKit);

    this.deviceCertificate = new DeviceCertificate(base64ToUint8(deviceCertificate));
    this.devicePrivateKey = devicePrivateKey;
    this.issuer = 'tmcs';
    this.apiUrl = 'https://developers.high-mobility.com/hm_cloud/api/v1/';

    this.telematics = new Telematics(this);
    this.commands = new Commands(this);
    this.storage = new Storage(this);
    this.crypto = new SdkNodeBindings(this);
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
    key: 'getAccessCertificate',
    value: function getAccessCertificate(serial) {
      var base64AccessCertificate = this.storage.get('access_certificates', serial);

      if (!base64AccessCertificate) return null;

      return new AccessCertificate(base64ToUint8(base64AccessCertificate));
    }
  }]);

  return HMKit;
}();

export default HMKit;