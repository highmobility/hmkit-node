"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrowserResponse = function BrowserResponse(bytes) {
  _classCallCheck(this, BrowserResponse);

  this.bytes = bytes;
};

BrowserResponse.identifier = [0x00, 0x49];
exports.default = BrowserResponse;