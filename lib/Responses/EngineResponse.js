"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EngineResponse = function () {
  function EngineResponse(bytes) {
    _classCallCheck(this, EngineResponse);

    this.engine = this.getEngineState(bytes);
  }

  _createClass(EngineResponse, [{
    key: "getEngineState",
    value: function getEngineState(bytes) {
      return bytes[3] === 0x00 ? 0 : 1;
    }
  }]);

  return EngineResponse;
}();

EngineResponse.identifier = [0x00, 0x35];
exports.default = EngineResponse;