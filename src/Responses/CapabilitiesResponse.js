/* eslint-disable no-useless-computed-key */
import PropertyResponse from '../PropertyResponse';
import CapabilityProperty from '../CapabilityProperty';
import OptionalProperty from '../OptionalProperty';
import CAPABILITY_IDENTIFIERS from '../CAPABILITY_IDENTIFIERS';

export default class CapabilitiesResponse extends PropertyResponse {
  static identifier = [0x00, 0x10];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new CapabilityProperty(0x01, 'capabilities').setOptionalSubProperties(
        'capabilityIdentifier',
        Object.entries(CAPABILITY_IDENTIFIERS).map(([name, { identifier }]) =>
          new OptionalProperty(identifier, name).setDecoder(
            this.getCapabilityDecoder(name)
          )
        )
      ),
    ];

    this.parse(data, properties);
  }

  getCapabilityDecoder(capability) {
    return bytes => ({
      supportedMessageTypes: bytes.map(
        byte => CAPABILITY_IDENTIFIERS[capability].messages[byte]
      ),
    });
  }
}
