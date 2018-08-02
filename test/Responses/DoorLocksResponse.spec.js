import Response from '../../src/Responses/Response';
import DoorLocksResponse from '../../src/Responses/DoorLocksResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DoorLocksResponse`, () => {
  it(`should return DoorLocksResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00200101000300000001000301000001000302000001000303000002000200000200020100020002020002000203000300020000030002010003000202000300020300'
      )
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual({
      doors: [
        {
          doorLocation: 'front_left',
          doorPosition: 'closed',
          doorLock: 'unlocked',
        },
        {
          doorLocation: 'front_right',
          doorPosition: 'closed',
          doorLock: 'unlocked',
        },
        {
          doorLocation: 'rear_right',
          doorPosition: 'closed',
          doorLock: 'unlocked',
        },
        {
          doorLocation: 'rear_left',
          doorPosition: 'closed',
          doorLock: 'unlocked',
        },
      ],
      insideDoorLocks: [
        {
          doorLocation: 'front_left',
          insideLock: 'unlocked',
        },
        {
          doorLocation: 'front_right',
          insideLock: 'unlocked',
        },
        {
          doorLocation: 'rear_right',
          insideLock: 'unlocked',
        },
        {
          doorLocation: 'rear_left',
          insideLock: 'unlocked',
        },
      ],
      outsideDoorLocks: [
        {
          doorLocation: 'front_left',
          outsideLock: 'unlocked',
        },
        {
          doorLocation: 'front_right',
          outsideLock: 'unlocked',
        },
        {
          doorLocation: 'rear_right',
          outsideLock: 'unlocked',
        },
        {
          doorLocation: 'rear_left',
          outsideLock: 'unlocked',
        },
      ],
    });
  });

  it(`should decode door data correctly`, () => {
    const doorLocksResponse = new DoorLocksResponse([]);

    expect(doorLocksResponse.doorDecoder([0x00, 0x00])).toEqual({
      doorPosition: 'closed',
      doorLock: 'unlocked',
    });

    expect(doorLocksResponse.doorDecoder([0x01, 0x01])).toEqual({
      doorPosition: 'open',
      doorLock: 'locked',
    });
  });
});
