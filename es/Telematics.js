var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import ApiClient from './ApiClient';
import Response from './Responses/Response';
var client = new ApiClient();
import { base64ToUint8, byteArrayToBase64, uint8ArrayToHex, hexToUint8Array } from './encoding';

var Telematics = function () {
  function Telematics(hmkit, SdkNodeBindings) {
    var _this = this;

    _classCallCheck(this, Telematics);

    this.getNonce = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return client.post(_this.hmkit.apiUrl + 'nonces', {
                body: JSON.stringify({
                  serial_number: _this.hmkit.getDeviceSerial()
                })
              });

            case 2:
              result = _context.sent;
              return _context.abrupt('return', result.body.nonce);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    this.onTelematicsSendData = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(issuer, serial, data) {
        var payload;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
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
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.onTelematicsCommandIncoming = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(serial, id, data) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.response = {
                  incomingCommandSerial: uint8ArrayToHex(new Uint8Array(serial)).toUpperCase(),
                  incomingCommandId: uint8ArrayToHex(new Uint8Array(id)).toUpperCase(),
                  incomingCommandData: new Uint8Array(data)
                };

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }();

    this.sendCommand = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(serial, data) {
        var nonce, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.getNonce(serial);

              case 2:
                nonce = _context4.sent;


                _this.SdkNodeBindings.sendTelematicsCommand(hexToUint8Array(serial).buffer, base64ToUint8(nonce).buffer, hexToUint8Array(data.toString()).buffer);

                result = void 0;
                _context4.prev = 5;
                _context4.next = 8;
                return _this.promise;

              case 8:
                result = _context4.sent;
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](5);

                console.log('caught exception', _context4.t0);

              case 14:

                _this.SdkNodeBindings.telematicsDataReceived(base64ToUint8(result.body.response_data).buffer);

                return _context4.abrupt('return', new Response(_this.response.incomingCommandData));

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this, [[5, 11]]);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }();

    this.hmkit = hmkit;
    this.SdkNodeBindings = SdkNodeBindings;
  }

  _createClass(Telematics, [{
    key: 'downloadAccessCertificate',
    value: function downloadAccessCertificate(accessToken) {
      var byteSignature = this.SdkNodeBindings.generateSignature(new Uint8Array(Buffer.from(accessToken)).buffer);
      var signature = byteArrayToBase64(byteSignature);

      console.log({
        serial_number: this.hmkit.getDeviceSerial(),
        access_token: accessToken,
        signature: signature
      });
      return client.post(this.hmkit.apiUrl + 'access_certificates', {
        body: JSON.stringify({
          serial_number: this.hmkit.getDeviceSerial(),
          access_token: accessToken,
          signature: signature
        })
      });
    }
  }]);

  return Telematics;
}();

export default Telematics;