import PropertyResponse from '../src/PropertyResponse';
import PropertyDecoder from '../src/PropertyDecoder';
import { switchDecoder } from '../src/helpers';
import { hexToUint8Array } from '../src/encoding';

describe(`PropertyResponse`, () => {
  it(`should parse properties correctly`, () => {
    const data = hexToUint8Array('00350101000101');

    const properties = [
      new PropertyDecoder(0x01, 'engine').setDecoder(
        switchDecoder({
          0x00: 'off',
          0x01: 'on',
        })
      ),
    ];

    const propertyResponse = new PropertyResponse();
    const parsedProperties = propertyResponse.parseProperties(data, properties);

    expect(parsedProperties).toEqual([{ engine: 'on' }]);
  });
});
