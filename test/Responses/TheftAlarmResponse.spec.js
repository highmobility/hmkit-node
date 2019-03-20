import Response from '../../src/Responses/Response';
import TheftAlarmResponse from '../../src/Responses/TheftAlarmResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TheftAlarmResponse`, () => {
  it(`should return TheftAlarmResponse`, () => {
    const response = new Response(
      hexToUint8Array('00460101000d0100010002000601699ab1f8ad')
    );

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);

    expect(response.parse()).toEqual({
      theftAlarm: {
        value: 'not_armed',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
