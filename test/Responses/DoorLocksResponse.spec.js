import Response from '../../src/Responses/Response';
import DoorLocksResponse from '../../src/Responses/DoorLocksResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DoorLocksResponse`, () => {
  it(`should return DoorLocksResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00200102000e010002000002000601699ab1f8b002000e010002010002000601699ab1f8b002000e010002020002000601699ab1f8b002000e010002030002000601699ab1f8b002000e010002050002000601699ab1f8b003000e010002000002000601699ab1f8b003000e010002010002000601699ab1f8b003000e010002020002000601699ab1f8b003000e010002030002000601699ab1f8b003000e010002050002000601699ab1f8b004000e010002000002000601699ab1f8b004000e010002010002000601699ab1f8b004000e010002020002000601699ab1f8b004000e010002030002000601699ab1f8b004000e010002050002000601699ab1f8b0'
      )
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);

    expect(response.parse()).toEqual({
      insideLocks: [
        {
          value: {
            doorLocation: 'front_left',
            lockState: 'unlocked',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'front_right',
            lockState: 'unlocked',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'rear_right',
            lockState: 'unlocked',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'rear_left',
            lockState: 'unlocked',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
      ],
      locks: [
        {
          value: {
            doorLocation: 'front_left',
            lockState: 'unlocked',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'front_right',
            lockState: 'unlocked',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'rear_right',
            lockState: 'unlocked',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'rear_left',
            lockState: 'unlocked',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
      ],
      positions: [
        {
          value: {
            doorLocation: 'front_left',
            position: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'front_right',
            position: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'rear_right',
            position: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
        {
          value: {
            doorLocation: 'rear_left',
            position: 'closed',
          },
          timestamp: new Date('2019-03-20T10:42:28.656Z'),
        },
      ],
    });
  });

  it(`should decode door data correctly`, () => {
    const doorLocksResponse = new DoorLocksResponse([]);

    expect(doorLocksResponse.positionDecoder([0x00])).toEqual({
      position: 'closed',
    });

    expect(doorLocksResponse.positionDecoder([0x01])).toEqual({
      position: 'open',
    });

    expect(doorLocksResponse.lockDecoder([0x00])).toEqual({
      lockState: 'unlocked',
    });

    expect(doorLocksResponse.lockDecoder([0x01])).toEqual({
      lockState: 'locked',
    });
  });
});
