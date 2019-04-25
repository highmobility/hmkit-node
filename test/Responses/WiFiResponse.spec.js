import Response from '../../src/Responses/Response';
import WiFiResponse from '../../src/Responses/WiFiResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WiFiResponse`, () => {
  it(`should return WiFiResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00590101000d0100010002000601699ab1f8b002000d0100010002000601699ab1f8b003000c01000002000601699ab1f8b004000d0100010002000601699ab1f8b0'
      )
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);

    expect(response.parse()).toEqual({
      wifiEnabled: {
        value: 'disabled',
        timestamp: new Date('2019-03-20T10:42:28.656Z'),
      },
      networkConnected: {
        value: 'disconnected',
        timestamp: new Date('2019-03-20T10:42:28.656Z'),
      },
      networkSSID: {
        value: '',
        timestamp: new Date('2019-03-20T10:42:28.656Z'),
      },
      networkSecurity: {
        value: 'none',
        timestamp: new Date('2019-03-20T10:42:28.656Z'),
      },
    });
  });
});
