import Response from '../../src/Responses/Response';
import OffroadResponse from '../../src/Responses/OffroadResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`OffroadResponse`, () => {
  it(`should return OffroadResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005201010002003c0200083fe999999999999aa2000813020c0f193b0078'
      )
    );

    expect(response.parse()).toBeInstanceOf(OffroadResponse);
    expect(response.parse()).toEqual({
      routeIncline: 60,
      wheelSuspension: 0.8,
    });
  });
});
