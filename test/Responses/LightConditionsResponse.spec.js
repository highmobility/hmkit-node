import Response from '../../src/Responses/Response';
import LightConditionsResponse from '../../src/Responses/LightConditionsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightConditionsResponse`, () => {
  it(`should return LightConditionsResponse`, () => {
    const response = new Response(
      hexToUint8Array('00540101000447D8CC000200043E800000')
    );

    expect(response.parse()).toBeInstanceOf(LightConditionsResponse);
    expect(response.parse()).toEqual({
      outsideLight: 111000,
      insideLight: 0.25,
    });
  });
});
