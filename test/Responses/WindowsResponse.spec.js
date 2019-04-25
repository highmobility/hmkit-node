import Response from '../../src/Responses/Response';
import WindowsResponse from '../../src/Responses/WindowsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindowsResponse`, () => {
  it(`should return WindowsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00450102001501000900000000000000000002000601699ab1f8b002001501000901000000000000000002000601699ab1f8b002001501000902000000000000000002000601699ab1f8b002001501000903000000000000000002000601699ab1f8b002001501000904000000000000000002000601699ab1f8b003000e010002000002000601699ab1f8b003000e010002010002000601699ab1f8b003000e010002020002000601699ab1f8b003000e010002030002000601699ab1f8b003000e010002040002000601699ab1f8b0'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    expect(response.parse()).toEqual({
      windowsOpenPercentages: [
        {
          value: {
            windowLocation: 'front_left',
            openPercentage: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            windowLocation: 'front_right',
            openPercentage: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            windowLocation: 'rear_right',
            openPercentage: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            windowLocation: 'rear_left',
            openPercentage: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            windowLocation: 'hatch',
            openPercentage: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
      ],
      windowsPositions: [
        {
          value: {
            windowLocation: 'front_left',
            windowPosition: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            windowLocation: 'front_right',
            windowPosition: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            windowLocation: 'rear_right',
            windowPosition: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            windowLocation: 'rear_left',
            windowPosition: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            windowLocation: 'hatch',
            windowPosition: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
      ],
    });
  });
});
