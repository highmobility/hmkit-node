import Response from '../../src/Responses/Response';
import WindowsResponse from '../../src/Responses/WindowsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindowsResponse`, () => {
  it(`should return WindowsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '004501020009003fe6666666666666020009013fd3333333333333020009023fe6666666666666020009033fd3333333333333020009043ff000000000000003000200000300020100030002020003000203000300020400a2000813020c0e36320078'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    expect(response.parse()).toEqual({
      windowsOpenPercentages: [
        { windowLocation: 'front_left', openPercentage: 0.7 },
        { windowLocation: 'front_right', openPercentage: 0.3 },
        { windowLocation: 'rear_right', openPercentage: 0.7 },
        { windowLocation: 'rear_left', openPercentage: 0.3 },
        { windowLocation: 'hatch', openPercentage: 1 },
      ],
      windowsPositions: [
        { windowLocation: 'front_left', windowPosition: 'closed' },
        { windowLocation: 'front_right', windowPosition: 'closed' },
        { windowLocation: 'rear_right', windowPosition: 'closed' },
        { windowLocation: 'rear_left', windowPosition: 'closed' },
        { windowLocation: 'hatch', windowPosition: 'closed' },
      ],
    });
  });
});
