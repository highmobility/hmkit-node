import Response from '../../src/Responses/Response';
import LightsResponse from '../../src/Responses/LightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightsResponse`, () => {
  it(`should return LightsResponse`, () => {
    const response = new Response(
      hexToUint8Array('003601010001020200010003000101040003ff0000')
    );
    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual({
      frontExteriorLight: 'full_beam',
      rearExteriorLight: 'inactive',
      interiorLight: 'active',
      ambientLight: '#ff0000',
    });
  });
});
