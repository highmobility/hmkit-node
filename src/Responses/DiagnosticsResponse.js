import { bytesSum } from '../helpers';
import { ieee754ToBase10 } from '../encoding';

export default class DiagnosticsResponse {
  static identifier = [0x00, 0x33];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.diagnosticsState(bytes);
    }
  }

  diagnosticsState(bytes) {
    this.mileage = this.getMileage(bytes);
    this.engineOilTemperature = this.getEngineOilTemperature(bytes);
    this.speed = this.getSpeed(bytes);
    this.engineRPM = this.getEngineRPM(bytes);
    this.fuelLevel = this.getFuelLevel(bytes);
    this.washerFluidLevel = this.getWasherFluidLevel(bytes);
    this.tires = this.getTires(bytes);
  }

  getVehicleState(bytes) {
    if (bytes[2] === 11) {
      this.mileage = this.getMileage(bytes);
      this.engineOilTemperature = this.getEngineOilTemperature(bytes);
      this.speed = this.getSpeed(bytes);
      this.engineRPM = this.getEngineRPM(bytes);
      this.fuelLevel = this.getFuelLevel(bytes);
      this.washerFluidLevel = this.getWasherFluidLevel(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getMileage(bytes) {
    return bytesSum([bytes[3], bytes[4], bytes[5]]);
  }

  getEngineOilTemperature(bytes) {
    return bytesSum([bytes[6], bytes[7]]);
  }

  getSpeed(bytes) {
    return bytesSum([bytes[8], bytes[9]]);
  }

  getEngineRPM(bytes) {
    return bytesSum([bytes[10], bytes[11]]);
  }

  getFuelLevel(bytes) {
    return bytesSum([bytes[12]]);
  }

  getWasherFluidLevel(bytes) {
    return bytes[13] === 1 ? 'filled' : 'low';
  }

  getTires(bytes) {
    const tires = {};
    const tiresCount = bytes[14];

    const positions = {
      0: 'frontLeft',
      1: 'frontRight',
      2: 'rearLeft',
      3: 'rearRight'
    };

    for (let i = 0; i < tiresCount; i++) {
      const pos = 15 + 5 * i;
      tires[positions[bytes[pos]]] = ieee754ToBase10([
        bytes[pos + 1],
        bytes[pos + 2],
        bytes[pos + 3],
        bytes[pos + 4]
      ]);
    }

    return tires;
  }
}
