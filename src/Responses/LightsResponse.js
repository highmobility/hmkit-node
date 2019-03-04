import PropertyResponse from '../PropertyResponse';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import PropertyDecoder from '../PropertyDecoder';
import { switchDecoder } from '../helpers';
import { hexArrayToHex } from '../encoding';

export default class LightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x36];

  /**
   * @property {String} frontExteriorLight (string 'inactive|active|active_with_full_beam|dlr|automatic') Front exterior light state
   * @property {String} rearExteriorLight (string 'inactive|active') Rear exterior light state
   * @property {String} ambientLight (string) Ambient light color
   * @property {String} reverseLight (string 'inactive|active') Reverse light state
   * @property {String} emergencyBrakeLight (string 'inactive|active') Emergency brake light state
   * @property {Array} fogLights (array) Fog lights ([{ location: (string 'front|rear'), state: (string 'inactive|active') }])
   * @property {Array} readingLamps (Array Reading lamps { location: (string 'front_left|front_right|rear_right|rear_left'), state: (string 'inactive|active')}`)
   * @property {Array} interiorLights (array) Interior lights ([{ location: (string 'front|rear'), state: (string 'inactive|active') }])
   *
   *
   * @example LightsResponse
    {
      frontExteriorLight: {
        data: 'inactive',
      },
      rearExteriorLight: {
        data: 'inactive',
      },
      ambientLight: {
        data: '#000000',
      },
      reverseLight: {
        data: 'inactive',
      },
      emergencyBrakeLight: {
        data: 'inactive',
      },
      fogLights: [{
        data: {
          location: 'front',
          state: 'inactive',
        },
      }, {
        data: {
          location: 'rear',
          state: 'inactive',
        },
      }],
      readingLamps: [{
        data: {
          location: 'front_left',
          state: 'inactive',
        },
      }, {
        data: {
          location: 'front_right',
          state: 'inactive',
        },
      }, {
        data: {
          location: 'rear_right',
          state: 'inactive',
        },
      }, {
        data: {
          location: 'rear_left',
          state: 'inactive',
        },
      }],
      interiorLights: [{
        data: {
          location: 'front',
          state: 'inactive',
        },
      }, {
        data: {
          location: 'rear',
          state: 'inactive',
        },
      }],
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'frontExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'active_with_full_beam',
          0x03: 'dlr',
          0x04: 'automatic',
        })
      ),
      new PropertyDecoder(0x02, 'rearExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x04, 'ambientLight').setDecoder(
        this.ambientLightDecoder
      ),
      new PropertyDecoder(0x05, 'reverseLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x06, 'emergencyBrakeLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x07, 'fogLights').setOptionalSubProperties(
        'location',
        [
          new OptionalPropertyDecoder(0x00, 'front').setDecoder(
            this.lightsDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'rear').setDecoder(
            this.lightsDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x08, 'readingLamps').setOptionalSubProperties(
        'location',
        [
          new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(
            this.lightsDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(
            this.lightsDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(
            this.lightsDecoder
          ),
          new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(
            this.lightsDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x09, 'interiorLights').setOptionalSubProperties(
        'location',
        [
          new OptionalPropertyDecoder(0x00, 'front').setDecoder(
            this.lightsDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'rear').setDecoder(
            this.lightsDecoder
          ),
        ]
      ),
    ];

    this.parse(data, properties, config);
  }

  lightsDecoder(data: Array<Number>) {
    return {
      state: switchDecoder({
        0x00: 'inactive',
        0x01: 'active',
      })(data),
    };
  }

  ambientLightDecoder(values: Array<String>) {
    return `#${hexArrayToHex(values)}`;
  }
}
