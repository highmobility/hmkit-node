export default class RooftopControlResponse {
  static identifier = [0x00, 0x25];

  constructor(bytes) {
    this.dimmingState = this.getDimmingState(bytes);
    this.openState = this.getOpenState(bytes);
  }

  getDimmingState(bytes) {
    return bytes[3] / 100;
  }

  getOpenState(bytes) {
    return bytes[4] / 100;
  }
}
