export default class TrunkAccessResponse {
  static identifier = [0x00, 0x21];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.lock = this.getLockState(bytes);
      this.position = this.getPositionState(bytes);
    }
  }

  getVehicleState(bytes) {
    if (bytes[2] === 2) {
      this.lock = this.getLockState(bytes);
      this.position = this.getPositionState(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getLockState(bytes) {
    return bytes[3] === 0 ? 'unlocked' : 'locked';
  }

  getPositionState(bytes) {
    return bytes[4] === 0 ? 'closed' : 'open';
  }
}
