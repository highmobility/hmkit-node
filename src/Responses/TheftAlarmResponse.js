export default class TheftAlarmResponse {
  static identifier = [0x00, 0x46];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.state = this.getState(bytes);
    }
  }

  getVehicleState(bytes) {
    if (bytes[2] === 1) {
      this.state = this.getState(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getState(bytes) {
    switch (bytes[3]) {
      case 0x01:
        return 'armed';

      case 0x02:
        return 'triggered';

      default:
        return 'not armed';
    }
  }
}
