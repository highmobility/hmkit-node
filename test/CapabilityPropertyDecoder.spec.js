import CapabilityPropertyDecoder from '../src/CapabilityPropertyDecoder';
import OptionalPropertyDecoder from '../src/OptionalPropertyDecoder';
import CAPABILITY_IDENTIFIERS from '../src/CAPABILITY_IDENTIFIERS';

function getCapabilityDecoder(capability) {
  return bytes => ({
    supportedMessageTypes: bytes.map(
      byte => CAPABILITY_IDENTIFIERS[capability].messages[byte]
    ),
  });
}

describe(`CapabilityPropertyDecoder`, () => {
  it(`should initialize`, () => {
    const capabilityProperty = new CapabilityPropertyDecoder(
      0x01,
      'capabilities'
    ).setOptionalSubProperties(
      'capabilityIdentifier',
      Object.entries(CAPABILITY_IDENTIFIERS).map(([name, { identifier }]) =>
        new OptionalPropertyDecoder(identifier, name).setDecoder(
          getCapabilityDecoder(name)
        )
      )
    );

    capabilityProperty.parseValue([0x00, 0x20, 0x00, 0x01, 0x12]);

    expect(
      capabilityProperty.subProperties.find(
        ({ identifier }) => identifier[1] === 0x20
      ).value
    ).toEqual({
      supportedMessageTypes: [
        'get_lock_state',
        'lock_state',
        'lock_unlock_doors',
      ],
    });
  });

  it(`should decode itself properly`, () => {
    const capabilityProperty = new CapabilityPropertyDecoder(
      0x01,
      'capabilities'
    ).setDecoder(data => data);

    expect(
      capabilityProperty.parseValue([0x00, 0x01, 0x02, 0x03, 0x04])
    ).toEqual(expect.arrayContaining([0x00, 0x01, 0x02, 0x03, 0x04]));
  });

  it(`should ignore missing subproperties`, () => {
    const capabilityProperty = new CapabilityPropertyDecoder(
      0x01,
      'capabilities'
    ).setOptionalSubProperties(
      'capabilityIdentifier',
      Object.entries(CAPABILITY_IDENTIFIERS).map(([name, { identifier }]) =>
        new OptionalPropertyDecoder(identifier, name).setDecoder(
          getCapabilityDecoder(name)
        )
      )
    );

    capabilityProperty.parseValue([0x00, 0xff, 0x00, 0x01, 0x02]);

    expect(
      capabilityProperty.subProperties.find(
        ({ identifier }) => identifier[1] === 0x21
      ).value
    ).toBeUndefined();
  });
});
