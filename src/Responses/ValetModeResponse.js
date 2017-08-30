export default class ValetModeResponse {
  static identifier = [0x00, 0x28];

  constructor(bytes) {
    this.mode = this.getMode(bytes);
  }

  getMode(bytes) {
    return bytes[3] === 0x00 ? 'deactivated' : 'activated';
  }
}
