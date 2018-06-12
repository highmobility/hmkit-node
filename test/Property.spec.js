import Property from '../src/Property';

describe(`Property`, () => {
  it(`should decode data correctly`, () => {
    const property = new Property(0x01, 'testime');
    expect(property.decode([0x01, 0x02])).toEqual([0x01, 0x02]);
    expect(property.decode([0x01])).toEqual(0x01);
  });
});
