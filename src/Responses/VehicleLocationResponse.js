import { ieee754ToBase10 } from '../encoding';

export default class VehicleLocationResponse {
  static identifier = [0x00, 0x30];

  constructor(bytes) {
    this.vehicleLocation(bytes);
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
