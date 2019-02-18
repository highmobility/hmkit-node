/* eslint-disable no-useless-computed-key */
import PropertyResponse from '../PropertyResponse';
import CapabilityPropertyDecoder from '../CapabilityPropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import CAPABILITY_IDENTIFIERS from '../CAPABILITY_IDENTIFIERS';

export default class HistoricalResponse extends PropertyResponse {
  static identifier = [0x00, 0x12];

  /**
   * @property {Object} states (array) Capability states ([{ capabilityIdentifier: (string), date: (date), state: (object) }])
   *
   * @example HistoricalResponse
    {
      states: [
        {
          capabilityIdentifier: 'trunk',
          date: 2018-02-14T18:30:01.000Z,
          state: {
            trunkLock: 'unlocked',
            trunkPosition: 'open',
          }
        }
      ]
    }
   */

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new CapabilityPropertyDecoder(0x01, 'states').setOptionalSubProperties(
        'capabilityIdentifier',
        Object.entries(CAPABILITY_IDENTIFIERS).map(([name, { identifier }]) => {
          return new OptionalPropertyDecoder(identifier, name).setDecoder(
            this.getCapabilityStateDecoder(identifier)
          );
        })
      ),
    ];

    this.parse(data, properties);
  }

  getCapabilityStateDecoder(identifier) {
    return bytes => ({
      state: new Response([...identifier, ...bytes]).parse(),
    });
  }
}
