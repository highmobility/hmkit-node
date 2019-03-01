import Response from '../../src/Responses/Response';
import PowerTakeOffResponse from '../../src/Responses/PowerTakeOffResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`PowerTakeOffResponse`, () => {
  it(`should return PowerTakeOffResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0065010100040100010002000401000100a2000b01000800000168e7315a68'
      )
    );

    expect(response.parse()).toBeInstanceOf(PowerTakeOffResponse);

    expect(response.parse()).toEqual({
      powerTakeoff: { data: 'inactive' },
      powerTakeoffEngaged: { data: 'not_engaged' },
    });
  });
});
