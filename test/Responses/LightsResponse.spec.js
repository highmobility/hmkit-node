import Response from '../../src/Responses/Response';
import LightsResponse from '../../src/Responses/LightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightsResponse`, () => {
  it(`should return LightsResponse`, () => {
    const response = new Response(hexToUint8Array('003601020100FF0000'));
    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual({
      frontExteriorLight: 'active_with_full_beam',
      rearExteriorLight: 'active',
      interiorLight: 'inactive',
      ambientLight: '#ff0000',
    });
  });

  it(`should return vehicle state version of LightsResponse`, () => {
    const response = new Response(hexToUint8Array('003603010100FF0000'));
    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual({
      frontExteriorLight: 'active',
      rearExteriorLight: 'active',
      interiorLight: 'inactive',
    });
    expect(response.parse().ambientLight).not.toBeDefined();
  });
});
