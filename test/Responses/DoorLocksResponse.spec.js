import Response from '../../src/Responses/Response';
import DoorLocksResponse from '../../src/Responses/DoorLocksResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DoorLocksResponse`, () => {
  it(`should return DoorLocksResponse`, () => {
    const response = new Response(
      hexToUint8Array('002001010003000100010003010000010003020001010003030001')
    );
    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual({
      doors: [
        {
          doorLocation: 'front_left',
          doorPosition: 'open',
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
          doorLock: 'locked',
        },
        {
          doorLocation: 'rear_left',
          doorPosition: 'closed',
          doorLock: 'locked',
        },
      ],
    });
  });
});
