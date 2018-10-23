import Response from '../../src/Responses/Response';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RooftopControlResponse`, () => {
  it(`should return RooftopControlResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `00250101000164020001320300010304000102a20008120a1710160e00b4`
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: 100,
      position: 50,
      convertibleRoof: 'closed_secured',
      sunroofTilt: 'half_tilted',
    });
  });
});
