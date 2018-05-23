import Response from '../../src/Responses/Response';
import LightsResponse from '../../src/Responses/LightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightsResponse`, () => {
  it(`should return LightsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0036010100010002000100030001000400030000ff0500010006000100'
      )
    );
    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual({
      frontExteriorLight: 'inactive',
      rearExteriorLight: 'inactive',
      interiorLight: 'inactive',
      ambientLight: '#0000ff',
      reverseLight: 'inactive',
      emergencyBrakeLight: 'inactive',
    });
  });
});
