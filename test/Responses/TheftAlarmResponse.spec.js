import Response from '../../src/Responses/Response';
import TheftAlarmResponse from '../../src/Responses/TheftAlarmResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TheftAlarmResponse`, () => {
  it(`should return TheftAlarmResponse`, () => {
    let response = new Response(hexToUint8Array('00460101000100'));

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response.parse()).toEqual({ state: 'not_armed' });

    response = new Response(hexToUint8Array('00460101000101'));

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response.parse()).toEqual({ state: 'armed' });

    response = new Response(hexToUint8Array('00460101000102'));

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response.parse()).toEqual({ state: 'triggered' });
  });
});
