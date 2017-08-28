export default class EngineResponse {
  static identifier = [0x00, 0x35];

  constructor(bytes) {
    this.engine = this.getEngineState(bytes);
  }

  getEngineState(bytes) {
    return bytes[3] === 0x00 ? 'off' : 'on';
  }
}
