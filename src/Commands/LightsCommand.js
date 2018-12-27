import Command from './Command';
import BaseCommand from './BaseCommand';
import { hexToInt } from '../encoding';

export default class LightsCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x36, 0x00]);
  }

  /**
   * @function control
   *
   * @property {String} frontExteriorLight (string: 'inactive|active|active_with_full_beam|dlr|automatic') Front exterior light
   * @property {String} rearExteriorLight (string: 'inactive|active') Rear exterior light
   * @property {String} ambientLight (string) Ambient light
   * @property {Array} fogLights (Array) Fog lights [{ location: (string: 'front|rear'), state: (string: 'inactive|active') }]
   * @property {Array} readingLamps (Array) Reading lamps [{ location: (string: 'front_left|front_right|rear_right|rear_left'), state: (string: 'inactive|active') }]
   * @property {Array} interiorLights (Array) Interior lights [{ location: (string: 'front|rear'), state: (string: 'inactive|active') }]
   */
  static control(
    frontExteriorLight: String,
    rearExteriorLight: String,
    ambientLight: String,
    fogLights: Array<Object>,
    readingLamps: Array<Object>,
    interiorLights: Array<Object>
  ) {
    let allFrontBytes = [];
    let allRearBytes = [];
    let allAmbientBytes = [];
    let allFogLightsBytes = [];
    let allReadingLampsBytes = [];
    let allInteriorLightsBytes = [];

    if (!!frontExteriorLight && frontExteriorLight.length > 0) {
      const frontExteriorLightOptions = {
        inactive: 0x00,
        active: 0x01,
        active_with_full_beam: 0x02,
        dlr: 0x03,
        automatic: 0x04,
      };

      allFrontBytes = this.buildProperty(
        0x01,
        frontExteriorLightOptions[frontExteriorLight]
      );
    }

    if (!!rearExteriorLight && rearExteriorLight.length > 0) {
      const rearExteriorLightOptions = {
        inactive: 0x00,
        active: 0x01,
      };

      allRearBytes = this.buildProperty(
        0x02,
        rearExteriorLightOptions[rearExteriorLight]
      );
    }

    if (!!ambientLight && ambientLight.length > 0) {
      const red = hexToInt(ambientLight.slice(1, 3));
      const green = hexToInt(ambientLight.slice(3, 5));
      const blue = hexToInt(ambientLight.slice(5, 7));

      allAmbientBytes = this.buildProperty(0x04, [red, green, blue]);
    }

    if (Array.isArray(fogLights) && fogLights.length > 0) {
      const fogLightsPositions = {
        front: 0x00,
        rear: 0x01,
      };

      const fogLightsOptions = {
        inactive: 0x00,
        active: 0x01,
      };

      allFogLightsBytes = fogLights.reduce(
        (fogLightBytes, { location, state }) =>
          fogLightBytes.concat(
            this.buildProperty(0x07, [
              fogLightsPositions[location],
              fogLightsOptions[state],
            ])
          ),
        []
      );
    }

    if (Array.isArray(readingLamps) && readingLamps.length > 0) {
      const readingLampsPositions = {
        front_left: 0x00,
        front_right: 0x01,
        rear_right: 0x02,
        rear_left: 0x03,
      };

      const readingLampsOptions = {
        inactive: 0x00,
        active: 0x01,
      };

      allReadingLampsBytes = readingLamps.reduce(
        (readingLampBytes, { location, state }) =>
          readingLampBytes.concat(
            this.buildProperty(0x08, [
              readingLampsPositions[location],
              readingLampsOptions[state],
            ])
          ),
        []
      );
    }

    if (Array.isArray(interiorLights) && interiorLights.length > 0) {
      const interiorLightsPositions = {
        front: 0x00,
        rear: 0x01,
      };

      const interiorLightsOptions = {
        inactive: 0x00,
        active: 0x01,
      };

      allInteriorLightsBytes = interiorLights.reduce(
        (interiorLightBytes, { location, state }) =>
          interiorLightBytes.concat(
            this.buildProperty(0x09, [
              interiorLightsPositions[location],
              interiorLightsOptions[state],
            ])
          ),
        []
      );
    }

    return new Command([
      0x00,
      0x36,
      0x12,
      ...allFrontBytes,
      ...allRearBytes,
      ...allAmbientBytes,
      ...allFogLightsBytes,
      ...allReadingLampsBytes,
      ...allInteriorLightsBytes,
    ]);
  }
}
