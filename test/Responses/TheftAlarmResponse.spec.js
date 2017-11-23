import Response from '../../src/Responses/Response';
import TheftAlarmResponse from '../../src/Responses/TheftAlarmResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TheftAlarmResponse`, () => {
  it(`should return TheftAlarmResponse`, () => {
    const response1 = new Response(hexToUint8Array('004601000401000102'));

    expect(response1.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response1.parse()).toEqual({ state: 'triggered' });
  });
});
