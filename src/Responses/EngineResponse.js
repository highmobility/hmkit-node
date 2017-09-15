export default class EngineResponse {
  static identifier = [0x00, 0x35];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.engine = this.getEngineState(bytes);
    }
  }

  getVehicleState(bytes) {
    if (bytes[2] === 1) {
      this.engine = this.getEngineState(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getEngineState(bytes) {
    return bytes[3] === 0x00 ? 'off' : 'on';
  }
}
