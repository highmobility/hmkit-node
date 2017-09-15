export default class RooftopControlResponse {
  static identifier = [0x00, 0x25];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.dimmingState = this.getDimmingState(bytes);
      this.openState = this.getOpenState(bytes);
    }
  }

  getVehicleState(bytes) {
    if (bytes[2] === 2) {
      this.dimmingState = this.getDimmingState(bytes);
      this.openState = this.getOpenState(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getDimmingState(bytes) {
    return bytes[3] / 100;
  }

  getOpenState(bytes) {
    return bytes[4] / 100;
  }
}
