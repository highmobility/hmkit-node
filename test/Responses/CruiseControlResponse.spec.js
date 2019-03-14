import Response from '../../src/Responses/Response';
import CruiseControlResponse from '../../src/Responses/CruiseControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`CruiseControlResponse`, () => {
  it(`should return CruiseControlResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00620101000401000100020004010001000300050100020000040004010001000500050100020000a2000b01000800000168e6fff148'
      )
    );
    expect(response.parse()).toBeInstanceOf(CruiseControlResponse);

    expect(response.parse()).toEqual({
      cruiseControl: { value: 'inactive' },
      limiter: { value: 'not_set' },
      targetSpeed: { value: 0 },
      acc: { value: 'inactive' },
      accTargetSpeed: { value: 0 },
    });
  });
});
