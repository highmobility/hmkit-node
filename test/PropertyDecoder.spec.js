import PropertyDecoder from '../src/PropertyDecoder';

describe(`PropertyDecoder`, () => {
  it(`should decode data correctly`, () => {
    const property = new PropertyDecoder(0x01, 'testime');
    expect(property.decode([0x01, 0x02])).toEqual([0x01, 0x02]);
    expect(property.decode([0x01])).toEqual(0x01);
  });

  it(`should decode data correctly`, () => {
    const prop = new PropertyDecoder(0x01, 'testProperty');
    expect(prop.decode([0x00, 0x01])).toEqual([0x00, 0x01]);
  });
});
