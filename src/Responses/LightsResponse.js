import PropertyResponse from '../PropertyResponse';
import OptionalProperty from '../OptionalProperty';
import Property from '../Property';
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
      frontExteriorLight: 'inactive',
      rearExteriorLight: 'inactive',
      ambientLight: '#254f4c',
      reverseLight: 'active',
      emergencyBrakeLight: 'active',
      fogLights: [{
        location: 'front'
        state: 'active'
      }, {
        location: 'rear'
        state: 'inactive'
      }],
      readingLamps: [{
        location: 'front_left',
        state: 'inactive'
      }, {
        location: 'front_right',
        state: 'inactive'
      }, {
        location: 'rear_right',
        state: 'inactive'
      }, {
        location: 'rear_left',
        state: 'inactive'
      }],
      interiorLights: [{
        location: 'front'
        state: 'active'
      }, {
        location: 'rear'
        state: 'inactive'
      }]
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'frontExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'active_with_full_beam',
          0x03: 'dlr',
          0x04: 'automatic',
        })
      ),
      new Property(0x02, 'rearExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x04, 'ambientLight').setDecoder(this.ambientLightDecoder),
      new Property(0x05, 'reverseLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x06, 'emergencyBrakeLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x07, 'fogLights').setOptionalSubProperties('location', [
        new OptionalProperty(0x00, 'front').setDecoder(this.lightsDecoder),
        new OptionalProperty(0x01, 'rear').setDecoder(this.lightsDecoder),
      ]),
      new Property(0x08, 'readingLamps').setOptionalSubProperties('location', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.lightsDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(
          this.lightsDecoder
        ),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.lightsDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.lightsDecoder),
      ]),
      new Property(0x09, 'interiorLights').setOptionalSubProperties(
        'location',
        [
          new OptionalProperty(0x00, 'front').setDecoder(this.lightsDecoder),
          new OptionalProperty(0x01, 'rear').setDecoder(this.lightsDecoder),
        ]
      ),
    ];

    this.parse(data, properties);
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
