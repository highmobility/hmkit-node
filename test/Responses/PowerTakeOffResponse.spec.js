import Response from '../../src/Responses/Response';
import PowerTakeOffResponse from '../../src/Responses/PowerTakeOffResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`PowerTakeOffResponse`, () => {
  it(`should return PowerTakeOffResponse`, () => {
    const response = new Response(hexToUint8Array('0065010100010002000100'));

    expect(response.parse()).toBeInstanceOf(PowerTakeOffResponse);

    expect(response.parse()).toEqual({
      powerTakeoff: 'inactive',
      powerTakeoffEngaged: 'not_engaged',
    });
  });
});
