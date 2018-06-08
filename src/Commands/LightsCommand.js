import Command from './Command';
import { hexToInt } from '../encoding';

export default class LightsCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x36, 0x00]);
  }

  /**
   * @function control
   *
   * @property {String} frontExteriorLight (string: 'inactive', 'active', 'active_with_full_beam') Front exterior light
   * @property {String} rearExteriorLight (string: 'inactive', 'active') Rear exterior light
   * @property {String} interiorLight (string: 'inactive', 'active') Interior light
   * @property {String} ambientLight 	(string, hex color: '#rrggbb') Ambient light
   */
  static control(
    frontExteriorLight: string,
    rearExteriorLight: string,
    interiorLight: string,
    ambientLight: string
  ) {
    let allFrontBytes = [];
    let allRearBytes = [];
    let allInteriorBytes = [];
    let allAmbientBytes = [];

    if (!!frontExteriorLight && frontExteriorLight.length > 0) {
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

    if (!!rearExteriorLight && rearExteriorLight.length > 0) {
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

    if (!!interiorLight && interiorLight.length > 0) {
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

    if (!!ambientLight && ambientLight.length > 0) {
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
