import PropertyResponse from '../PropertyResponse';
import OptionalProperty from '../OptionalProperty';
import Property from '../Property';
import { switchDecoder } from '../helpers';
import { hexArrayToHex } from '../encoding';

export default class LightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x36];

  /**
   * @property {String} frontExteriorLight (string) Front exterior light state
   * @property {String} rearExteriorLight (string) Rear exterior light state
   * @property {String} interiorLight (string) Interior light state
   * @property {String} ambientLight (string) Ambient light color
   * @property {String} reverseLight (string) Reverse light state
   * @property {String} emergencyBrakeLight (string) Emergency brake light state
   * @property {Array} fogLights (array) Fog lights ([{ fogLightLocation: (string 'front|rear'), fogLightState: (string 'inactive|active') }])
   * @property {Array} readingLamps (Array Reading lamps { readingLampLocation: (string 'front_left|front_right|rear_right|rear_left'), readingLampState: (string 'inactive|active')}`)
   * @property {Array} interiorLights (array) Interior lights ([{ interiorLightLocation: (string 'front|rear'), interiorLightState: (string 'inactive|active') }])
   *
   *
   * @example LightsResponse
    {
      frontExteriorLight: 'inactive',
      rearExteriorLight: 'inactive',
      interiorLight: 'inactive',
      ambientLight: '#254f4c',
      reverseLight: 'active',
      emergencyBrakeLight: 'active',
      fogLights: [{
        fogLightLocation: 'front'
        fogLightState: 'active'
      },
      {
        fogLightLocation: 'rear'
        fogLightState: 'inactive'
      }],
      readingLamps: [{
        readingLampLocation: 'front_left',
        readingLampState: 'inactive'
      }, {
        readingLampLocation: 'front_right',
        readingLampState: 'inactive'
      }, {
        readingLampLocation: 'rear_right',
        readingLampState: 'inactive'
      }, {
        readingLampLocation: 'rear_left',
        readingLampState: 'inactive'
      }],
      interiorLights: [{
        interiorLightLocation: 'front'
        interiorLightState: 'active'
      },
      {
        interiorLightLocation: 'rear'
        interiorLightState: 'inactive'
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
      new Property(0x03, 'interiorLight').setDecoder(
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
      new Property(0x07, 'fogLights').setOptionalSubProperties(
        'fogLightLocation',
        [
          new OptionalProperty(0x00, 'front').setDecoder(
            this.fogLightDecoder
          ),
          new OptionalProperty(0x01, 'rear').setDecoder(
            this.fogLightDecoder
          ),
        ]
      ),
      new Property(0x08, 'readingLamps').setOptionalSubProperties(
        'readingLampLocation',
        [
          new OptionalProperty(0x00, 'front_left').setDecoder(
            this.readingLampDecoder
          ),
          new OptionalProperty(0x01, 'front_right').setDecoder(
            this.readingLampDecoder
          ),
          new OptionalProperty(0x02, 'rear_right').setDecoder(
            this.readingLampDecoder
          ),
          new OptionalProperty(0x03, 'rear_left').setDecoder(
            this.readingLampDecoder
          ),
        ]
      ),
      new Property(0x09, 'interiorLights').setOptionalSubProperties(
        'interiorLightLocation',
        [
          new OptionalProperty(0x00, 'front').setDecoder(
            this.interiorLightDecoder
          ),
          new OptionalProperty(0x01, 'rear').setDecoder(
            this.interiorLightDecoder
          ),
        ]
      ),
    ];

    this.parse(data, properties);
  }

  ambientLightDecoder(values: Array<String>) {
    return `#${hexArrayToHex(values)}`;
  }

  fogLightDecoder(data: Array<Number>) {
    return {
      fogLightState: switchDecoder({
        0x00: 'inactive',
        0x01: 'active',
      })(data),
    };
  }

  readingLampDecoder(data: Array<Number>) {
    return {
      readingLampState: switchDecoder({
        0x00: 'inactive',
        0x01: 'active',
      })(data),
    };
  }

  interiorLightDecoder(data: Array<Number>) {
    return {
      interiorLightState: switchDecoder({
        0x00: 'inactive',
        0x01: 'active',
      })(data),
    };
  }
}
