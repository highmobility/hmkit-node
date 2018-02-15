import Command from './Command';
import { hexToInt } from '../encoding';

export default class LightsCommand {
  static getState() {
    return new Command([0x00, 0x36, 0x00]);
  }

  static control(
    frontExteriorLight: string,
    rearExteriorLight: string,
    interiorLight: string,
    ambientLight: string
  ) {
    var allFrontBytes = [];
    var allRearBytes = [];
    var allInteriorBytes = [];
    var allAmbientBytes = [];

    if (frontExteriorLight.length > 0) {
      const frontExteriorLightOptions = {
        inactive: 0x00,
        active: 0x01,
        active_with_full_beam: 0x02,
      };

      allFrontBytes = [
        0x01,
        0x00,
        0x01,
        frontExteriorLightOptions[frontExteriorLight],
      ];
    }

    if (rearExteriorLight.length > 0) {
      const rearExteriorLightOptions = {
        inactive: 0x00,
        active: 0x01,
      };

      allRearBytes = [
        0x02,
        0x00,
        0x01,
        rearExteriorLightOptions[rearExteriorLight],
      ];
    }

    if (interiorLight.length > 0) {
      const interiorLightOptions = {
        inactive: 0x00,
        active: 0x01,
      };

      allInteriorBytes = [
        0x03,
        0x00,
        0x01,
        interiorLightOptions[interiorLight],
      ];
    }

    if (ambientLight.length > 0) {
      const red = hexToInt(ambientLight.slice(1, 3));
      const green = hexToInt(ambientLight.slice(3, 5));
      const blue = hexToInt(ambientLight.slice(5, 7));

      allAmbientBytes = [0x04, 0x00, 0x03, red, green, blue];
    }

    return new Command([
      0x00,
      0x36,
      0x02,
      ...allFrontBytes,
      ...allRearBytes,
      ...allInteriorBytes,
      ...allAmbientBytes,
    ]);
  }
}
