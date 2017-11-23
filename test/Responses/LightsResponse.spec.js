import Response from '../../src/Responses/Response';
import LightsResponse from '../../src/Responses/LightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightsResponse`, () => {
  it(`should return LightsResponse`, () => {
    const response = new Response(
      hexToUint8Array('0036010018010001020200010003000101040001FF0500010006000100')
    );
    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual({
      frontExteriorLight: 'full_beam',
      rearExteriorLight: 'inactive',
      interiorLight: 'active',
      ambientLight: '#ff0000'
    });
  });
});
