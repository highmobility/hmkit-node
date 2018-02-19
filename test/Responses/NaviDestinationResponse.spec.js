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
        latitude: 52.520008,
        longitude: 13.404954,
      },
      destinationName: 'Berlin',
    });
  });
});
