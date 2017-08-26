var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { base64ToUint8, uint8ArrayToHex, hexToInt, hexToUint8Array } from './encoding';
import Permissions from './Permissions';

var AccessCertificate = function () {
  function AccessCertificate(bytes) {
    _classCallCheck(this, AccessCertificate);

    this.bytes = bytes;
    this.rawAccessCertificate = this.parse(bytes);
    this.accessGainingSerialNumber = this.getVehicleSerial();
    this.accessGainingPublicKey = this.getVehiclePublicKey();
    this.accessProvidingSerialNumber = this.getClientSerial();
    this.validityStartDate = this.getValidityStartDate();
    this.validityEndDate = this.getValidityEndDate();
    this.permissions = this.rawAccessCertificate.permissions;
    this.signature = this.rawAccessCertificate.signature;
    this.accessCertificate = this.get();
  }

  _createClass(AccessCertificate, [{
    key: 'parse',
    value: function parse(bytes) {
      var permissionsSize = uint8ArrayToHex(bytes.slice(92, 93)).toUpperCase();

      return {
        accessGainingSerialNumber: uint8ArrayToHex(bytes.slice(0, 9)).toUpperCase(),
        accessGainingPublicKey: uint8ArrayToHex(bytes.slice(9, 73)).toUpperCase(),
        accessProvidingSerialNumber: uint8ArrayToHex(bytes.slice(73, 82)).toUpperCase(),
        validityStartDate: uint8ArrayToHex(bytes.slice(82, 87)).toUpperCase(),
        validityEndDate: uint8ArrayToHex(bytes.slice(87, 92)).toUpperCase(),
        permissionsSize: permissionsSize,
        permissions: uint8ArrayToHex(bytes.slice(93, 93 + hexToInt(permissionsSize))).toUpperCase(),
        signature: uint8ArrayToHex(bytes.slice(93 + hexToInt(permissionsSize), 93 + hexToInt(permissionsSize) + 64)).toUpperCase()
      };
    }
  }, {
    key: 'get',
    value: function get() {
      return {
        accessGainingSerialNumber: this.accessGainingSerialNumber,
        accessGainingPublicKey: this.accessGainingPublicKey,
        accessProvidingSerialNumber: this.accessProvidingSerialNumber,
        validityStartDate: this.validityStartDate,
        validityEndDate: this.validityEndDate,
        permissions: this.permissions
      };
    }
  }, {
    key: 'getVehicleSerial',
    value: function getVehicleSerial() {
      return this.rawAccessCertificate.accessGainingSerialNumber;
    }
  }, {
    key: 'getVehiclePublicKey',
    value: function getVehiclePublicKey() {
      return this.rawAccessCertificate.accessGainingPublicKey;
    }
  }, {
    key: 'getClientSerial',
    value: function getClientSerial() {
      return this.rawAccessCertificate.accessProvidingSerialNumber;
    }
  }, {
    key: 'isDateValid',
    value: function isDateValid(date) {
      var _hexToUint8Array = hexToUint8Array(date),
          _hexToUint8Array2 = _slicedToArray(_hexToUint8Array, 5),
          year = _hexToUint8Array2[0],
          month = _hexToUint8Array2[1],
          day = _hexToUint8Array2[2],
          hour = _hexToUint8Array2[3],
          minute = _hexToUint8Array2[4];

      if (year > 99) return false;
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
      if (hour > 23) return false;
      if (minute > 59) return false;

      return true;
    }
  }, {
    key: 'getValidityStartDate',
    value: function getValidityStartDate() {
      if (!this.isDateValid(this.rawAccessCertificate.validityStartDate)) {
        throw new Error('Start date is not valid.');
      }

      var _hexToUint8Array3 = hexToUint8Array(this.rawAccessCertificate.validityStartDate),
          _hexToUint8Array4 = _slicedToArray(_hexToUint8Array3, 5),
          year = _hexToUint8Array4[0],
          month = _hexToUint8Array4[1],
          day = _hexToUint8Array4[2],
          hour = _hexToUint8Array4[3],
          minute = _hexToUint8Array4[4];

      return new Date('20' + year, month, day, hour, minute);
    }
  }, {
    key: 'getValidityEndDate',
    value: function getValidityEndDate() {
      if (!this.isDateValid(this.rawAccessCertificate.validityEndDate)) {
        throw new Error('End date is not valid.');
      }

      var _hexToUint8Array5 = hexToUint8Array(this.rawAccessCertificate.validityEndDate),
          _hexToUint8Array6 = _slicedToArray(_hexToUint8Array5, 5),
          year = _hexToUint8Array6[0],
          month = _hexToUint8Array6[1],
          day = _hexToUint8Array6[2],
          hour = _hexToUint8Array6[3],
          minute = _hexToUint8Array6[4];

      return new Date('20' + year, month, day, hour, minute);
    }
  }, {
    key: 'getPermissions',
    value: function getPermissions() {
      return new Permissions(base64ToUint8(this.rawAccessCertificate.permissions));
    }
  }]);

  return AccessCertificate;
}();

export default AccessCertificate;