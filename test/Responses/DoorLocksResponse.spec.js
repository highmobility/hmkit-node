import Response from '../../src/Responses/Response';
import DoorLocksResponse from '../../src/Responses/DoorLocksResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DoorLocksResponse`, () => {
  it(`should return DoorLocksResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '002001020002000002000201000200020200020002030003000200000300020100030002020003000203000400020000040002010004000202010400020300a20008120a110e360700b4'
      )
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual({
      insideLocks: [
        { doorLocation: 'front_left', lockState: 'unlocked' },
        { doorLocation: 'front_right', lockState: 'unlocked' },
        { doorLocation: 'rear_right', lockState: 'unlocked' },
        { doorLocation: 'rear_left', lockState: 'unlocked' },
      ],
      locks: [
        { doorLocation: 'front_left', lockState: 'unlocked' },
        { doorLocation: 'front_right', lockState: 'unlocked' },
        { doorLocation: 'rear_right', lockState: 'unlocked' },
        { doorLocation: 'rear_left', lockState: 'unlocked' },
      ],
      positions: [
        { doorLocation: 'front_left', position: 'closed' },
        { doorLocation: 'front_right', position: 'closed' },
        { doorLocation: 'rear_right', position: 'open' },
        { doorLocation: 'rear_left', position: 'closed' },
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
