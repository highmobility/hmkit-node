import Response from '../../src/Responses/Response';
import LightConditionsResponse from '../../src/Responses/LightConditionsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightConditionsResponse`, () => {
  it(`should return LightConditionsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005401010010010004461c400002000601699ab1f8ad020010010004447a000002000601699ab1f8ad'
      )
    );

    expect(response.parse()).toBeInstanceOf(LightConditionsResponse);

    expect(response.parse()).toEqual({
      outsideLight: {
        value: 10000,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      insideLight: {
        value: 1000,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
