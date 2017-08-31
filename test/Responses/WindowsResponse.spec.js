import Response from '../../src/Responses/Response';
import WindowsResponse from '../../src/Responses/WindowsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindowsResponse`, () => {
  it(`should return WindowsResponse`, () => {
    const response = new Response(hexToUint8Array('004501040001010002010300'));

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        frontLeft: 'open',
        frontRight: 'closed',
        rearRight: 'open',
        rearLeft: 'closed',
      })
    );
  });
});
