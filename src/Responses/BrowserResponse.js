export default class BrowserResponse {
  static identifier = [0x00, 0x49];

  constructor(bytes) {
    this.bytes = bytes;
  }
}
