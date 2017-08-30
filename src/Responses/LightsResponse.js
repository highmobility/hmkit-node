import { intToHex, pad } from '../encoding';

export default class LightsResponse {
  static identifier = [0x00, 0x36];

  constructor(bytes) {
    if (bytes[2] === 0x01) {
      this.getState(bytes);
    } else {
      this.getVehicleState(bytes);
    }
  }

  getState(bytes) {
    this.frontExteriorLight = this.getFrontExteriorLight(bytes);
    this.rearExteriorLight = this.getRearExteriorLighte(bytes);
    this.interiorLight = this.getInteriorLight(bytes);
    this.ambientLight = this.getAmbientLight(bytes);
  }

  getVehicleState(bytes) {
    this.frontExteriorLight = this.getFrontExteriorLight(bytes);
    this.rearExteriorLight = this.getRearExteriorLighte(bytes);
    this.interiorLight = this.getInteriorLight(bytes);
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
