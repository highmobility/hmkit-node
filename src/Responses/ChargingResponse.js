import { bytesSum } from '../helpers';
import { ieee754ToBase10 } from '../encoding';

export default class ChargingResponse {
  static identifier = [0x00, 0x23];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.getState(bytes);
    }
  }

  getState(bytes) {
    this.chargingState = this.getChargingState(bytes);
    this.estimatedRange = this.getEstimatedRange(bytes);
    this.batteryLevel = this.getBatteryLevel(bytes);
    this.batteryCurrent = this.getBatteryCurrent(bytes);
    this.chargerVoltage = this.getChargerVoltage(bytes);
    this.chargeLimit = this.getChargeLimit(bytes);
    this.timeToCompleteCharge = this.getTimeToCompleteCharge(bytes);
    this.chargeRate = this.getChargeRate(bytes);
    this.chargePortState = this.getChargePortState(bytes);
  }

  getVehicleState(bytes) {
    this.chargingState = this.getChargingState(bytes);
    this.estimatedRange = this.getEstimatedRange(bytes);
    this.batteryLevel = this.getBatteryLevel(bytes);
    this.batteryCurrent = this.getBatteryCurrent(bytes);
    this.chargerVoltage = this.getChargerVoltage(bytes);
  }

  getChargingState(bytes) {
    switch (bytes[3]) {
      case 0x00:
        return 'disconnected';
      case 0x01:
        return 'plugged_in';
      case 0x02:
        return 'charging';
      default:
        return 'charging_complete';
    }
  }

  getEstimatedRange(bytes) {
    return bytesSum([bytes[4], bytes[5]]);
  }

  getBatteryLevel(bytes) {
    return bytes[6] / 100;
  }

  getBatteryCurrent(bytes) {
    return ieee754ToBase10([bytes[7], bytes[8], bytes[9], bytes[10]]);
  }

  getChargerVoltage(bytes) {
    return bytesSum([bytes[11], bytes[12]]);
  }

  getChargeLimit(bytes) {
    return bytes[13] / 100;
  }

  getTimeToCompleteCharge(bytes) {
    return bytesSum([bytes[14], bytes[15]]);
  }

  getChargeRate(bytes) {
    return ieee754ToBase10([bytes[16], bytes[17], bytes[18], bytes[19]]);
  }

  getChargePortState(bytes) {
    switch (bytes[20]) {
      case 0x00:
        return 'closed';
      case 0x01:
        return 'open';
      default:
        return 'unavailable';
    }
  }
}
