'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage(hmkit) {
    _classCallCheck(this, Storage);

    this.hmkit = hmkit;
    this.storageDirPath = _path2.default.resolve(__dirname, '..', 'storage');
  }

  _createClass(Storage, [{
    key: 'get',
    value: function get(storeName, key) {
      var store = this.getStore(storeName);

      return this.findFromStore(store, key);
    }
  }, {
    key: 'add',
    value: function add(storeName, key, value) {
      var store = this.getStore(storeName);

      var newStore = _extends({}, store, _defineProperty({}, key, value));

      return this.put(storeName, newStore);
    }
  }, {
    key: 'getStoreFilePath',
    value: function getStoreFilePath(storeName) {
      return _path2.default.resolve(this.storageDirPath, storeName) + '.json';
    }
  }, {
    key: 'getStore',
    value: function getStore(storeName) {
      var storePath = this.getStoreFilePath(storeName);

      if (!_fs2.default.existsSync(storePath)) {
        return {};
      }

      var storeContents = _fs2.default.readFileSync(storePath, 'utf8');
      if (!this.isJson(storeContents)) {
        throw new Error('Invalid json in file "' + storePath + '"');
      }

      return JSON.parse(storeContents);
    }
  }, {
    key: 'isJson',
    value: function isJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
  }, {
    key: 'findFromStore',
    value: function findFromStore(store, key) {
      return store[key] ? store[key] : null;
    }
  }, {
    key: 'put',
    value: function put(storeName, data) {
      var storePath = this.getStoreFilePath(storeName);
      _fs2.default.writeFileSync(storePath, JSON.stringify(data, null, 2));
    }
  }, {
    key: 'destroy',
    value: function destroy(storeName) {
      var storePath = this.getStoreFilePath(storeName);
      if (!_fs2.default.existsSync(storePath)) return;

      _fs2.default.unlinkSync(storePath);
    }
  }, {
    key: 'putRaw',
    value: function putRaw(storeName, contents) {
      var storePath = this.getStoreFilePath(storeName);
      _fs2.default.writeFileSync(storePath, contents);
    }
  }]);

  return Storage;
}();

exports.default = Storage;