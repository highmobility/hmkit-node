import Response from '../../src/Responses/Response';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RooftopControlResponse`, () => {
  it(`should return RooftopControlResponse`, () => {
    const response = new Response(hexToUint8Array('0025016400'));
    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimmingState: 1,
      openState: 0,
    });
  });

  it(`should return RooftopControl VS`, () => {
    const response = new Response(hexToUint8Array('0025023264')).vehicleState();
    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimmingState: 0.5,
      openState: 1,
    });

    const response2 = new Response(
      hexToUint8Array('0025233264')
    ).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });
});
