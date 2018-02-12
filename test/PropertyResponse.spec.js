import PropertyResponse from '../src/PropertyResponse';
import Property from '../src/Property';
import { switchDecoder } from '../src/helpers';
import { hexToUint8Array } from '../src/encoding';

describe(`PropertyResponse`, () => {
  it(`should parse properties correctly`, () => {
    const data = hexToUint8Array('0035010000');

    const properties = [
      new Property(0x01, 'engine').setDecoder(
        switchDecoder({
          0x00: 'off',
          0x01: 'on',
        })
      ),
    ];

    const propertyResponse = new PropertyResponse();
    const parsedProperties = propertyResponse.parseProperties(data, properties);

    expect(parsedProperties.map(prop => prop.value)).toEqual([undefined]);
  });
});
