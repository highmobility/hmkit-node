import Response from '../../src/Responses/Response';
import FailureMessageResponse from '../../src/Responses/FailureMessageResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`FailureMessageResponse`, () => {
  it(`should return FailureMessageResponse`, () => {
    const response = new Response(
      hexToUint8Array('00020101000501000200450200040100010003000401000101')
    );

    expect(response.parse()).toBeInstanceOf(FailureMessageResponse);
    expect(response.parse()).toEqual({
      autoApi: {
        value: {
          lsb: 69,
          namespace: 'windows',
          label: 'Windows',
        },
      },
      type: { value: 0 },
      reason: {
        value: {
          key: 1,
          value:
            'Unauthorised - User has not been authenticated or lacks permissions',
        },
      },
    });
  });

  it(`should return FailureMessageResponse with no Auto API info`, () => {
    const response = new Response(
      hexToUint8Array('0002010200040100010003000401000101')
    );

    expect(response.parse()).toBeInstanceOf(FailureMessageResponse);
    expect(response.parse().autoApi).toBeUndefined();
  });

  it(`should parse autoapi correctly`, () => {
    const response = new FailureMessageResponse([]);

    expect(response.failedCapabilityDecoder([0x00, 0xff])).toEqual({
      lsb: 0xff,
    });

    expect(response.failedCapabilityDecoder([0x00, 0x20])).toEqual({
      label: 'Door Locks',
      namespace: 'doorLocks',
      lsb: 0x20,
    });
  });
});
