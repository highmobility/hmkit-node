import Response from '../../src/Responses/Response';
import FailureMessageResponse from '../../src/Responses/FailureMessageResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`FailureMessageResponse`, () => {
  it(`should return FailureMessageResponse`, () => {
    const response = new Response(
      hexToUint8Array('00020101000200450200010003000101')
    );

    expect(response.parse()).toBeInstanceOf(FailureMessageResponse);
    expect(response.parse()).toEqual({
      autoApi: {
        lsb: 69,
        namespace: 'windows',
        label: 'Windows',
      },
      type: 0,
      reason: {
        key: 1,
        value:
          'Unauthorised - User has not been authenticated or lacks permissions',
      },
    });
  });

  it(`should return FailureMessageResponse with no Auto API info`, () => {
    const response = new Response(hexToUint8Array('0002010200010003000101'));
    expect(response.parse()).toBeInstanceOf(FailureMessageResponse);
    expect(response.parse().autoApi).toBe(undefined);
  });
});
