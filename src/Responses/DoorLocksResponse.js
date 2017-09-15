export default class DoorLocksResponse {
  static identifier = [0x00, 0x20];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.doors = this.getDoorLocksState(bytes);
    }
  }

  getVehicleState(bytes) {
    const doorsCount = bytes[3];

    if (bytes[2] === 1 + doorsCount * 3) {
      this.doors = this.getDoorLocksState(bytes);
    } else {
      this.error = 'invalid state size';
    }
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
