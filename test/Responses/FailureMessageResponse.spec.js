import Response from '../../src/Responses/Response';
import FailureMessageResponse from '../../src/Responses/FailureMessageResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`FailureMessageResponse`, () => {
  it(`should return FailureMessageResponse`, () => {
    const response = new Response(hexToUint8Array('00020100210001'));
    expect(response.parse()).toBeInstanceOf(FailureMessageResponse);
    expect(response.parse()).toEqual({
      api: {
        label: 'Trunk Access',
        lsb: 33,
        namespace: 'trunkAccess',
      },
      type: 0,
      reason: {
        key: 1,
        value:
          'Unauthorised - User has not been authenticated or lacks permissions',
      },
    });
  });
});
