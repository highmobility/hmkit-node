export default class TrunkAccessResponse {
  static identifier = [0x00, 0x21];

  constructor(bytes) {
    this.lock = this.getLockState(bytes);
    this.position = this.getPositionState(bytes);
  }

  getLockState(bytes) {
    return bytes[3] === 0 ? 'unlocked' : 'locked';
  }

  getPositionState(bytes) {
    return bytes[4] === 0 ? 'closed' : 'open';
  }
}
