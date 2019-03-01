import Response from '../../src/Responses/Response';
import TheftAlarmResponse from '../../src/Responses/TheftAlarmResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TheftAlarmResponse`, () => {
  it(`should return TheftAlarmResponse`, () => {
    const response = new Response(
      hexToUint8Array('00460101000401000100a2000b01000800000168e735d8b3')
    );

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response.parse()).toEqual({ theftAlarm: { data: 'not_armed' } });
  });
});
