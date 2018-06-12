import Response from '../../src/Responses/Response';
import TheftAlarmResponse from '../../src/Responses/TheftAlarmResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TheftAlarmResponse`, () => {
  it(`should return TheftAlarmResponse`, () => {
    const response = new Response(hexToUint8Array('00460101000101'));

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response.parse()).toEqual({ theftAlarm: 'armed' });
  });
});
