import Response from '../../src/Responses/Response';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RooftopControlResponse`, () => {
  it(`should return RooftopControlResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `0025010100083fd999999999999a0200083fe3333333333333030001010400010005000101a2000813020c0e14280078`
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: 0.4,
      position: 0.6,
      convertibleRoof: 'open',
      sunroofTilt: 'closed',
      sunroofState: 'open',
    });
  });
});
