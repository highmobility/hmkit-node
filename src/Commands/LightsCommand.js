import Command from './Command';
import { hexToInt } from '../encoding';

export default class LightsCommand {
  static getState() {
    return new Command([0x00, 0x36, 0x00]);
  }

  static setState(
    frontExteriorLight: string,
    rearExteriorLight: string,
    interiorLight: string,
    ambientLight: string
  ) {
    const frontExteriorLightOptions = {
      inactive: 0x00,
      active: 0x01,
      active_with_full_beam: 0x02,
    };

    const rearExteriorLightOptions = {
      inactive: 0x00,
      active: 0x01,
    };

    const interiorLightOptions = {
      inactive: 0x00,
      active: 0x01,
    };

    const red = hexToInt(ambientLight.slice(1, 3));
    const green = hexToInt(ambientLight.slice(3, 5));
    const blue = hexToInt(ambientLight.slice(5, 7));

    return new Command([
      0x00,
      0x36,
      0x02,
      frontExteriorLightOptions[frontExteriorLight],
      rearExteriorLightOptions[rearExteriorLight],
      interiorLightOptions[interiorLight],
      red,
      green,
      blue,
    ]);
  }
}
