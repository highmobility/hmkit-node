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

  it(`should return vehicle state version of Lights`, () => {
    const response = new Response(
      hexToUint8Array('003603010000')
    ).vehicleState();
    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual({
      frontExteriorLight: 'active',
      rearExteriorLight: 'inactive',
      interiorLight: 'inactive',
    });
    expect(response.parse().ambientLight).not.toBeDefined();

    const response2 = new Response(
      hexToUint8Array('003602010000')
    ).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });
});
