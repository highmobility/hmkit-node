import Response from '../../src/Responses/Response';
import OffroadResponse from '../../src/Responses/OffroadResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`OffroadResponse`, () => {
  it(`should return OffroadResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005201010005010002000002000b0100080000000000000000a2000b01000800000168e72ea9ab'
      )
    );

    expect(response.parse()).toBeInstanceOf(OffroadResponse);
    expect(response.parse()).toEqual({
      routeIncline: 0,
      wheelSuspension: 0,
    });
  });
});
