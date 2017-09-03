import Response from '../../src/Responses/Response';
import TheftAlarmResponse from '../../src/Responses/TheftAlarmResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TheftAlarmResponse`, () => {
  it(`should return TheftAlarmResponse`, () => {
    const response1 = new Response(hexToUint8Array('00460101'));

    expect(response1.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response1.parse()).toEqual({ state: 'armed' });

    const response2 = new Response(hexToUint8Array('00460100'));

    expect(response2.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response2.parse()).toEqual({ state: 'not armed' });

    const response3 = new Response(hexToUint8Array('00460102'));

    expect(response3.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response3.parse()).toEqual({ state: 'triggered' });
  });
});
