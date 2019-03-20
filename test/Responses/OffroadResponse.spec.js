import Response from '../../src/Responses/Response';
import OffroadResponse from '../../src/Responses/OffroadResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`OffroadResponse`, () => {
  it(`should return OffroadResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00520101000e010002000002000601699ab1f8ae020014010008000000000000000002000601699ab1f8ae'
      )
    );

    expect(response.parse()).toBeInstanceOf(OffroadResponse);

    expect(response.parse()).toEqual({
      routeIncline: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      wheelSuspension: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
    });
  });
});
