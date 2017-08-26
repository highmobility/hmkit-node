function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import ApiClient from './ApiClient';
import Response from './Responses/Response';
var client = new ApiClient();
import { base64ToUint8, byteArrayToBase64, uint8ArrayToHex, hexToUint8Array } from './encoding';
import AccessCertificate from './AccessCertificate';

var Telematics = function Telematics(hmkit) {
  var _this = this;

  _classCallCheck(this, Telematics);

  this.downloadAccessCertificate = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(accessToken) {
      var byteSignature, signature, _ref2, rawAccessCertificate, accessCertificate;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              byteSignature = _this.hmkit.crypto.generateSignature(new Uint8Array(Buffer.from(accessToken)).buffer);
              signature = byteArrayToBase64(byteSignature);
              _context.next = 4;
              return client.post(_this.hmkit.apiUrl + 'access_certificates', {
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

  this.getNonce = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return client.post(_this.hmkit.apiUrl + 'nonces', {
              body: JSON.stringify({
                serial_number: _this.hmkit.deviceCertificate.getSerial()
              })
            });

          case 2:
            result = _context2.sent;
            return _context2.abrupt('return', result.body.nonce);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  this.onTelematicsSendData = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(issuer, serial, data) {
      var payload;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              payload = {
                serial_number: uint8ArrayToHex(new Uint8Array(serial)).toUpperCase(),
                issuer: uint8ArrayToHex(new Uint8Array(issuer)).toUpperCase(),
                data: byteArrayToBase64(data)
              };


              _this.promise = client.post(_this.hmkit.apiUrl + 'telematics_commands', {
                body: JSON.stringify(payload)
              });

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x2, _x3, _x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.onTelematicsCommandIncoming = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(serial, id, data) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this.response = {
                incomingCommandSerial: uint8ArrayToHex(new Uint8Array(serial)).toUpperCase(),
                incomingCommandId: uint8ArrayToHex(new Uint8Array(id)).toUpperCase(),
                incomingCommandData: new Uint8Array(data)
              };

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x5, _x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.sendCommand = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(serial, data) {
      var nonce, result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.getNonce(serial);

            case 2:
              nonce = _context5.sent;


              _this.hmkit.crypto.sendTelematicsCommand(hexToUint8Array(serial).buffer, base64ToUint8(nonce).buffer, hexToUint8Array(data.toString()).buffer);

              result = void 0;
              _context5.prev = 5;
              _context5.next = 8;
              return _this.promise;

            case 8:
              result = _context5.sent;
              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5['catch'](5);

              console.log('caught exception', _context5.t0);

            case 14:

              _this.hmkit.crypto.telematicsDataReceived(base64ToUint8(result.body.response_data).buffer);

              return _context5.abrupt('return', new Response(_this.response.incomingCommandData));

            case 16:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[5, 11]]);
    }));

    return function (_x8, _x9) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.hmkit = hmkit;
};

export default Telematics;