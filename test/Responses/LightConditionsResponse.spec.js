import Response from '../../src/Responses/Response';
import LightConditionsResponse from '../../src/Responses/LightConditionsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightConditionsResponse`, () => {
  it(`should return LightConditionsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005401010007010004461c4000020007010004447a0000a2000b01000800000168e7163ae4'
      )
    );

    expect(response.parse()).toBeInstanceOf(LightConditionsResponse);
    expect(response.parse()).toEqual({
      outsideLight: { value: 10000 },
      insideLight: { value: 1000 },
    });
  });
});
