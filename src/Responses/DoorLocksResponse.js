export default class DoorLocksResponse {
  static identifier = [0x00, 0x20];

  constructor(bytes) {
    this.doors = this.getDoorLocksState(bytes);
  }

  getDoorLocksState(bytes) {
    const doors = {};
    const doorsCount = bytes[3];

    const positions = {
      0: 'frontLeft',
      1: 'frontRight',
      2: 'rearRight',
      3: 'rearLeft',
    };

    for (let i = 0; i < doorsCount; i++) {
      const pos = 4 + 3 * i;
      doors[positions[bytes[pos]]] = {
        position: this.getPositionValue(bytes[pos + 1]),
        lock: this.getLockValue(bytes[pos + 2]),
      };
    }

    return doors;
  }

  getPositionValue(byte) {
    return byte === 0 ? 'closed' : 'open';
  }

  getLockValue(byte) {
    return byte === 0 ? 'unlocked' : 'locked';
  }
}
