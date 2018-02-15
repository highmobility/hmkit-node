import Response from '../../src/Responses/Response';
import NaviDestinationResponse from '../../src/Responses/NaviDestinationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`NaviDestinationResponse`, () => {
  it(`should return NaviDestinationResponse`, () => {
    const response = new Response(
      hexToUint8Array('0031010100084252147D41567AB10200064265726C696E')
    );
    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        latitude: 52.5200080871582,
        longitude: 13.404953956604004,
      },
      destinationName: 'Berlin',
    });
  });
});
