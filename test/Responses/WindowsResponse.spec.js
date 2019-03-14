import Response from '../../src/Responses/Response';
import WindowsResponse from '../../src/Responses/WindowsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindowsResponse`, () => {
  it(`should return WindowsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00450102000c01000900000000000000000002000c01000901000000000000000002000c01000902000000000000000002000c01000903000000000000000002000c01000904000000000000000003000501000200000300050100020100030005010002020003000501000203000300050100020400a2000b01000800000168e741f36a'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    expect(response.parse()).toEqual({
      windowsOpenPercentages: [
        { value: { windowLocation: 'front_left', openPercentage: 0 } },
        { value: { windowLocation: 'front_right', openPercentage: 0 } },
        { value: { windowLocation: 'rear_right', openPercentage: 0 } },
        { value: { windowLocation: 'rear_left', openPercentage: 0 } },
        { value: { windowLocation: 'hatch', openPercentage: 0 } },
      ],
      windowsPositions: [
        { value: { windowLocation: 'front_left', windowPosition: 'closed' } },
        { value: { windowLocation: 'front_right', windowPosition: 'closed' } },
        { value: { windowLocation: 'rear_right', windowPosition: 'closed' } },
        { value: { windowLocation: 'rear_left', windowPosition: 'closed' } },
        { value: { windowLocation: 'hatch', windowPosition: 'closed' } },
      ],
    });
  });
});
