/* eslint-disable no-useless-computed-key */
import PropertyResponse from '../PropertyResponse';
import Response from './Response';
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
            trunkLock: {
              data: 'unlocked'
            },
            trunkPosition: {
              data: 'open'
            },
          }
        }
      ]
    }
   */

  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new CapabilityPropertyDecoder(0x01, 'states').setOptionalSubProperties(
        'capabilityIdentifier',
        Object.entries(CAPABILITY_IDENTIFIERS).map(([name, { identifier }]) =>
          new OptionalPropertyDecoder(identifier, name).setDecoder(
            this.getCapabilityStateDecoder(identifier)
          )
        )
      ),
    ];

    this.parse(data, properties, config);
  }

  getCapabilityStateDecoder(identifier) {
    return bytes => {
      const response = new Response([...identifier, ...bytes], {
        withUniversalProperties: true,
      }).parse();

      const date = response.date;
      delete response.date;

      return {
        state: response,
        date,
      };
    };
  }
}
