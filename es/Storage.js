var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import path from 'path';
import fs from 'fs';

var Storage = function () {
  function Storage(hmkit) {
    _classCallCheck(this, Storage);

    this.hmkit = hmkit;
    this.storageDirPath = path.resolve(__dirname, '..', 'storage');
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
      return path.resolve(this.storageDirPath, storeName) + '.json';
    }
  }, {
    key: 'getStore',
    value: function getStore(storeName) {
      var storePath = this.getStoreFilePath(storeName);

      if (!fs.existsSync(storePath)) {
        return {};
      }

      var storeContents = fs.readFileSync(storePath, 'utf8');
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
      fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
    }
  }]);

  return Storage;
}();

export default Storage;