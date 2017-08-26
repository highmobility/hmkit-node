'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AccessCertificate = require('./AccessCertificate');

var _AccessCertificate2 = _interopRequireDefault(_AccessCertificate);

var _encoding = require('./encoding');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      return new _AccessCertificate2.default((0, _encoding.base64ToUint8)(base64AccessCertificate));
    }
  }]);

  return AccessCertificatesManager;
}();

exports.default = AccessCertificatesManager;