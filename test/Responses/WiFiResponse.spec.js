import Response from '../../src/Responses/Response';
import WiFiResponse from '../../src/Responses/WiFiResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WiFiResponse`, () => {
  it(`should return WiFiResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005901010004010001000200040100010003000301000004000401000100a2000b01000800000168e7412bed'
      )
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual({
      wifiEnabled: 'disabled',
      networkConnected: 'disconnected',
      networkSSID: '',
      networkSecurity: 'none',
    });
  });
});
