import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder, decimalToHexStringDecoder } from '../helpers';

export default class LightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x36];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'frontExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
          0x02: 'full_beam'
        })
      ),
      new Property(0x02, 'rearExteriorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active'
        })
      ),
      new Property(0x03, 'interiorLight').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active'
        })
      ),
      new Property(0x04, 'ambientLightRed').setDecoder(decimalToHexStringDecoder),
      new Property(0x05, 'ambientLightGreen').setDecoder(decimalToHexStringDecoder),
      new Property(0x06, 'ambientLightBlue').setDecoder(decimalToHexStringDecoder)
    ];

    this.parse(data, properties);
  }

  bindProperties(properties: Array<Property>) {
    properties
      .filter(property => [0x01, 0x02, 0x03].includes(property.identifier))
      .forEach(property => {
        this[property.namespace] = property.value;
      });

    this.ambientLight = this.getAmbientLight(
      properties
        .filter(property => [0x04, 0x05, 0x06].includes(property.identifier))
        .map(property => property.value)
    );
  }

  getAmbientLight(values: Array<String>) {
    return `#${values[0]}${values[1]}${values[2]}`;
  }
}
