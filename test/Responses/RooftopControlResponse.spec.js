import Response from '../../src/Responses/Response';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RooftopControlResponse`, () => {
  it(`should return RooftopControlResponse`, () => {
    const response = new Response(hexToUint8Array('0025216400'));
    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimmingState: 1,
      openState: 0,
    });
  });
});
