import { ieee754ToBase10 } from '../encoding';

export default class VehicleLocationResponse {
  static identifier = [0x00, 0x30];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.vehicleLocation(bytes);
    }
  }

  getVehicleState(bytes) {
    if (bytes[2] === 8) {
      this.vehicleLocation(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  vehicleLocation(bytes) {
    this.latitude = this.getLatitude(bytes);
    this.longitude = this.getLongitude(bytes);
  }

  getLatitude(bytes) {
    return ieee754ToBase10([bytes[3], bytes[4], bytes[5], bytes[6]]);
  }

  getLongitude(bytes) {
    return ieee754ToBase10([bytes[7], bytes[8], bytes[9], bytes[10]]);
  }
}
