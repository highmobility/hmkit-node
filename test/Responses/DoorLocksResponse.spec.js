import Response from '../../src/Responses/Response';
import DoorLocksResponse from '../../src/Responses/DoorLocksResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DoorLocksResponse`, () => {
  it(`should return DoorLocksResponse`, () => {
    const response = new Response(
      hexToUint8Array('00200100140000020100010002010002000201000300020100')
    );
    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual({
      doors: {
        frontLeft: {
          position: 'closed',
          lock: 'unlocked'
        },
        frontRight: {
          position: 'closed',
          lock: 'unlocked'
        },
        rearRight: {
          position: 'closed',
          lock: 'unlocked'
        },
        rearLeft: {
          position: 'closed',
          lock: 'unlocked'
        }
      }
    });
  });
});
