import { intToHex, pad } from '../encoding';

export default class LightsResponse {
  static identifier = [0x00, 0x36];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.getState(bytes);
    }
  }

  getState(bytes) {
    this.frontExteriorLight = this.getFrontExteriorLight(bytes);
    this.rearExteriorLight = this.getRearExteriorLighte(bytes);
    this.interiorLight = this.getInteriorLight(bytes);
    this.ambientLight = this.getAmbientLight(bytes);
  }

  getVehicleState(bytes) {
    if (bytes[2] === 3) {
      this.frontExteriorLight = this.getFrontExteriorLight(bytes);
      this.rearExteriorLight = this.getRearExteriorLighte(bytes);
      this.interiorLight = this.getInteriorLight(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getFrontExteriorLight(bytes) {
    switch (bytes[3]) {
      case 0x01:
        return 'active';
      case 0x02:
        return 'active_with_full_beam';
      default:
        return 'inactive';
    }
  }

  getRearExteriorLighte(bytes) {
    return bytes[4] === 0x00 ? 'inactive' : 'active';
  }

  getInteriorLight(bytes) {
    return bytes[5] === 0x00 ? 'inactive' : 'active';
  }

  getAmbientLight(bytes) {
    return `#${pad(intToHex(bytes[6]), 2)}${pad(intToHex(bytes[7]), 2)}${pad(
      intToHex(bytes[8]),
      2
    )}`;
  }
}
