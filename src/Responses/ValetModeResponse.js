export default class ValetModeResponse {
  static identifier = [0x00, 0x28];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.mode = this.getMode(bytes);
    }
  }

  getVehicleState(bytes) {
    if (bytes[2] === 1) {
      this.mode = this.getMode(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getMode(bytes) {
    return bytes[3] === 0x00 ? 'deactivated' : 'activated';
  }
}
