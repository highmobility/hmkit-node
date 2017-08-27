var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import AccessCertificate from './AccessCertificate';
import { base64ToUint8, byteArrayToBase64 } from './encoding';

var AccessCertificatesManager = function () {
  function AccessCertificatesManager(hmkit) {
    var _this = this;

    _classCallCheck(this, AccessCertificatesManager);

    this.download = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(accessToken) {
        var byteSignature, signature, _ref2, rawAccessCertificate, accessCertificate;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                byteSignature = _this.hmkit.crypto.generateSignature(new Uint8Array(Buffer.from(accessToken)).buffer);
                signature = byteArrayToBase64(byteSignature);
                _context.next = 4;
                return _this.hmkit.apiClient.post(_this.hmkit.api.getUrl() + 'access_certificates', {
                  body: JSON.stringify({
                    serial_number: _this.hmkit.deviceCertificate.getSerial(),
                    access_token: accessToken,
                    signature: signature
                  })
                });

              case 4:
                _ref2 = _context.sent;
                rawAccessCertificate = _ref2.body.device_access_certificate;
                accessCertificate = new AccessCertificate(base64ToUint8(rawAccessCertificate));


                _this.hmkit.storage.add('access_certificates', accessCertificate.getVehicleSerial(), rawAccessCertificate);

                return _context.abrupt('return', accessCertificate);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

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