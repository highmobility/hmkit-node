import { bytesSum } from '../helpers';

export default class MaintenanceResponse {
  static identifier = [0x00, 0x34];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.daysToNextService = this.getDaysToNextService(bytes);
      this.kilometersToNextService = this.getKilometersToNextService(bytes);
    }
  }

  getVehicleState(bytes) {
    if (bytes[2] === 5) {
      this.daysToNextService = this.getDaysToNextService(bytes);
      this.kilometersToNextService = this.getKilometersToNextService(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getDaysToNextService(bytes) {
    return bytesSum([bytes[3], bytes[4]]);
  }

  getKilometersToNextService(bytes) {
    return bytesSum([bytes[5], bytes[6], bytes[7]]);
  }
}
