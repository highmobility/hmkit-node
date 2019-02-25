import Response from '../../src/Responses/Response';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RooftopControlResponse`, () => {
  it(`should return RooftopControlResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `00250101000b010008000000000000000002000b0100080000000000000000030004010001000400040100010005000401000100a2000b01000800000168e732e1c1`
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: 0,
      position: 0,
      convertibleRoof: 'closed',
      sunroofTilt: 'closed',
      sunroofState: 'closed',
    });
  });
});
