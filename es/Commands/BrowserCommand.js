var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Command from './Command';
import { stringToHex, hexToUint8Array } from '../encoding';

var BrowserCommand = function () {
  function BrowserCommand() {
    _classCallCheck(this, BrowserCommand);
  }

  _createClass(BrowserCommand, null, [{
    key: 'loadUrl',
    value: function loadUrl(url) {
      var command = [0x00, 0x35, 0x00];
      var urlInBytes = hexToUint8Array(stringToHex(url));
      command = [].concat(_toConsumableArray(command), [urlInBytes.length], _toConsumableArray(Array.from(urlInBytes)));
      return new Command(command);
    }
  }]);

  return BrowserCommand;
}();

export default BrowserCommand;