'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSdkNodeBindings;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSdkNodeBindings() {
  if (_fs2.default.existsSync(_path2.default.resolve(__dirname, 'sdk-node-bindings', 'lib', 'binding.js'))) {
    return require('../sdk-node-bindings/lib/binding.js');
  } else if (process.platform === 'darwin') {
    return require('bindings/macos');
  }

  throw new Error('Native "hmkit" addon missing for your platform.');
};