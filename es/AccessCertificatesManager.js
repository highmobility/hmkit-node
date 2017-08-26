var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import AccessCertificate from './AccessCertificate';
import { base64ToUint8 } from './encoding';

var AccessCertificatesManager = function () {
  function AccessCertificatesManager(hmkit) {
    _classCallCheck(this, AccessCertificatesManager);

    this.hmkit = hmkit;
  }

  _createClass(AccessCertificatesManager, [{
    key: 'get',
    value: function get(serial) {
      var base64AccessCertificate = this.hmkit.storage.get('access_certificates', serial);

      if (!base64AccessCertificate) return null;

      return new AccessCertificate(base64ToUint8(base64AccessCertificate));
    }
  }]);

  return AccessCertificatesManager;
}();

export default AccessCertificatesManager;