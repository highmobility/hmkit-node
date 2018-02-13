import Response from '../../src/Responses/Response';
import OffroadResponse from '../../src/Responses/OffroadResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`OffroadResponse`, () => {
  it(`should return OffroadResponse`, () => {
    const response = new Response(hexToUint8Array('005201010002FFF602000132'));

    expect(response.parse()).toBeInstanceOf(OffroadResponse);
    expect(response.parse()).toEqual({
      routeIncline: -10,
      wheelSuspension: 0.5,
    });
  });
});
