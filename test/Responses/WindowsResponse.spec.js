import Response from '../../src/Responses/Response';
import WindowsResponse from '../../src/Responses/WindowsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindowsResponse`, () => {
  it.only(`should return WindowsResponse`, () => {
    const response = new Response(
      hexToUint8Array('0045010100020001010002010001000202010100020300')
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        windows: {
          frontLeft: 'open',
          frontRight: 'closed',
          rearRight: 'open',
          rearLeft: 'closed',
          hatch: null,
        },
      })
    );
  });

  it(`should return Windows VS`, () => {
    const response = new Response(
      hexToUint8Array('004509040001010002010300')
    ).vehicleState();

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        frontLeft: 'open',
        frontRight: 'closed',
        rearRight: 'open',
        rearLeft: 'closed',
      })
    );

    const response2 = new Response(
      hexToUint8Array('00450A040001010002010300')
    ).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });
});
