import Response from '../../src/Responses/Response';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RooftopControlResponse`, () => {
  it(`should return RooftopControlResponse`, () => {
    const response = new Response(hexToUint8Array('0025010100016402000105'));

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: 100,
      position: 5,
    });
  });
});
