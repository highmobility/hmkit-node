import Response from '../../src/Responses/Response';
import DoorLocksResponse from '../../src/Responses/DoorLocksResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DoorLocksResponse`, () => {
  it(`should return DoorLocksResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '002001020005010002000002000501000201000200050100020200020005010002030002000501000204000200050100020500030005010002000003000501000201000300050100020200030005010002030003000501000204000300050100020500040005010002000004000501000201000400050100020200040005010002030004000501000204000400050100020500a2000b01000800000168e702fd39'
      )
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual({
      insideLocks: [
        { data: { doorLocation: 'front_left', lockState: 'unlocked' } },
        { data: { doorLocation: 'front_right', lockState: 'unlocked' } },
        { data: { doorLocation: 'rear_right', lockState: 'unlocked' } },
        { data: { doorLocation: 'rear_left', lockState: 'unlocked' } },
        { data: { doorLocation: 'all', lockState: 'unlocked' } },
      ],
      locks: [
        { data: { doorLocation: 'front_left', lockState: 'unlocked' } },
        { data: { doorLocation: 'front_right', lockState: 'unlocked' } },
        { data: { doorLocation: 'rear_right', lockState: 'unlocked' } },
        { data: { doorLocation: 'rear_left', lockState: 'unlocked' } },
        { data: { doorLocation: 'all', lockState: 'unlocked' } },
      ],
      positions: [
        { data: { doorLocation: 'front_left', position: 'closed' } },
        { data: { doorLocation: 'front_right', position: 'closed' } },
        { data: { doorLocation: 'rear_right', position: 'closed' } },
        { data: { doorLocation: 'rear_left', position: 'closed' } },
        { data: { doorLocation: 'all', position: 'closed' } },
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
