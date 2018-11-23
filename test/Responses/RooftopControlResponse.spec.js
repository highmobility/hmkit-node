import Response from '../../src/Responses/Response';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RooftopControlResponse`, () => {
  it(`should return RooftopControlResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `0025010100011802000123030001000400010105000100a20008120b170f152e0078`
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: 24,
      position: 35,
      convertibleRoof: 'closed',
      sunroofTilt: 'tilted',
      sunroofState: 'closed',
    });
  });
});
