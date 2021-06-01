import { parseData } from '../src/Utils/ResponseUtils';
import { AUTO_API_LEVEL, PROPERTY_DATA_ID } from '../src/Utils/CommandUtils';

import { PROPERTY_AVAILABILITY_ID } from '../src/Utils/EncodingUtils';

describe('Response utils', () => {
  it('should parse a response containing property data into a valid json', () => {
    const parsedData = parseData([
      AUTO_API_LEVEL,
      0x00,
      0x60, // Message Identifier for Home Charger State
      0x01, // Command Type for Home Charger State

      0x01, // Property ID for Charging status
      0x00,
      0x04, // Property Size is 4 bytes
      PROPERTY_DATA_ID, // Data Component identifier
      0x00,
      0x01, // Data Component size is 1 byte(s)
      0x02, // Charging is active
    ]);
    expect(parsedData).toEqual({
      chargingStatus: {
        data: {
          value: 'charging',
        },
      },
    });
  });

  it('should parse a response containing availability data into a valid json', () => {
    const parsedData = parseData([
      AUTO_API_LEVEL,
      0x00,
      0x60, // Message Identifier for Home Charger State
      0x01, // Command Type for Home Charger State

      0x01, // Property ID for Charging status
      0x00,
      0x0f, // Property Size is 15 bytes
      PROPERTY_AVAILABILITY_ID, // Availability Component identifier
      0x00,
      0x0c, // payload size is 12 bytes
      0x00, // update rate is 'trip_high' (data is updated with high frequency during a trip)
      0x0e,
      0x04,
      0x40,
      0x50,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00, // 0x0e044050000000000000, // rate limit frequency is 64.0 mhz
      0x01, // rate limit applies per 'vehicle'
    ]);
    expect(parsedData).toEqual({
      chargingStatus: {
        availability: {
          updateRate: {
            value: 'trip_high',
          },
          rateLimit: {
            value: 64,
            unit: 'megahertz',
          },
          appliesPer: {
            value: 'vehicle',
          },
        },
      },
    });
  });
});
