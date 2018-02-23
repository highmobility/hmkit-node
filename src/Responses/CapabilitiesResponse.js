/* eslint-disable no-useless-computed-key */
import PropertyResponse from '../PropertyResponse';
import CapabilityProperty from '../CapabilityProperty';
import OptionalProperty from '../OptionalProperty';

const CAPABILITY_MESSAGE_MAP = {
  door_locks: {
    [0x00]: 'get_lock_state',
    [0x01]: 'lock_state',
    [0x02]: 'lock_unlock_doors',
  },
  trunk: {
    [0x00]: 'get_trunk_state',
    [0x01]: 'trunk_state',
    [0x02]: 'open_close_trunk',
  },
};

export default class CapabilitiesResponse extends PropertyResponse {
  static identifier = [0x00, 0x10];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new CapabilityProperty(0x01, 'capabilities').setOptionalSubProperties(
        'capabilityIdentifier',
        [
          new OptionalProperty([0x00, 0x20], 'door_locks').setDecoder(
            this.getCapabilityDecoder('door_locks')
          ),
          new OptionalProperty([0x00, 0x21], 'trunk').setDecoder(
            this.getCapabilityDecoder('trunk')
          ),
        ]
      ),
    ];

    this.parse(data, properties);
  }

  getCapabilityDecoder(capability) {
    return bytes => ({
      supportedMessageTypes: bytes.map(
        byte => CAPABILITY_MESSAGE_MAP[capability][byte]
      ),
    });
  }
}
