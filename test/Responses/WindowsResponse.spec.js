import Response from '../../src/Responses/Response';
import WindowsResponse from '../../src/Responses/WindowsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindowsResponse`, () => {
  it(`should return WindowsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '004501020002001e020002013202000202320200020332020002042803000200000300020101030002020103000203000300020400a20008120a1d0b18290078'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    expect(response.parse()).toEqual({
      windowsOpenPercentages: [
        {
          windowLocation: 'front_left',
          openPercentage: 0.3,
        },
        {
          windowLocation: 'front_right',
          openPercentage: 0.5,
        },
        {
          windowLocation: 'rear_right',
          openPercentage: 0.5,
        },
        {
          windowLocation: 'rear_left',
          openPercentage: 0.5,
        },
        {
          windowLocation: 'hatch',
          openPercentage: 0.4,
        },
      ],
      windowsPositions: [
        {
          windowLocation: 'front_left',
          windowPosition: 'closed',
        },
        {
          windowLocation: 'front_right',
          windowPosition: 'opened',
        },
        {
          windowLocation: 'rear_right',
          windowPosition: 'opened',
        },
        {
          windowLocation: 'rear_left',
          windowPosition: 'closed',
        },
        {
          windowLocation: 'hatch',
          windowPosition: 'closed',
        },
      ],
    });
  });
});
