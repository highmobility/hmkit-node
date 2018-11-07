import Response from '../../src/Responses/Response';
import NaviDestinationResponse from '../../src/Responses/NaviDestinationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`NaviDestinationResponse`, () => {
  it(`should return NaviDestinationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003101070010404a428f5c28f5c3402ad70a3d70a3d70200064e61726e6961a20008120b060e19250078'
      )
    );

    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        latitude: 52.52,
        longitude: 13.42,
      },
      destinationName: 'Narnia',
    });
  });
});
