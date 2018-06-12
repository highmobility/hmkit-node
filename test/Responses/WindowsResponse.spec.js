import Response from '../../src/Responses/Response';
import WindowsResponse from '../../src/Responses/WindowsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindowsResponse`, () => {
  it(`should return WindowsResponse`, () => {
    const response = new Response(
      hexToUint8Array('0045010100020001010002010001000202010100020300')
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    expect(response.parse()).toEqual({
      windows: [
        {
          windowPosition: 'front_left',
          windowState: 'open',
        },
        {
          windowPosition: 'front_right',
          windowState: 'closed',
        },
        {
          windowPosition: 'rear_right',
          windowState: 'open',
        },
        {
          windowPosition: 'rear_left',
          windowState: 'closed',
        },
      ],
    });
  });
});
