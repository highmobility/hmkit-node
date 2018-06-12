import Response from '../../src/Responses/Response';
import WiFiResponse from '../../src/Responses/WiFiResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WiFiResponse`, () => {
  it(`should return WiFiResponse`, () => {
    const response = new Response(
      hexToUint8Array('0059010100010102000101030004484F4D4504000103')
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual({
      wifiEnabled: 'enabled',
      networkConnected: 'connected',
      networkSSID: 'HOME',
      networkSecurity: 'wpa2_personal',
    });
  });
});
