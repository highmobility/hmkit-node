import Response from '../../src/Responses/Response';
import CruiseControlResponse from '../../src/Responses/CruiseControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`CruiseControlResponse`, () => {
  it(`should return CruiseControlResponse`, () => {
    const response = new Response(
      hexToUint8Array('00620101000100020001000300020000040001000500020000')
    );
    expect(response.parse()).toBeInstanceOf(CruiseControlResponse);

    expect(response.parse()).toEqual({
      cruiseControl: 'inactive',
      limiter: 'not_set',
      targetSpeed: 0,
      acc: 'inactive',
      accTargetSpeed: 0,
    });
  });
});
