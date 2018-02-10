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
      doors: {
        frontLeft: {
          position: 'open',
          lock: 'unlocked',
        },
        frontRight: {
          position: 'closed',
          lock: 'unlocked',
        },
        rearRight: {
          position: 'closed',
          lock: 'locked',
        },
        rearLeft: {
          position: 'closed',
          lock: 'locked',
        },
      },
    });
  });
});
