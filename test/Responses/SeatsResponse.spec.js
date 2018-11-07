import Response from '../../src/Responses/Response';
import SeatsResponse from '../../src/Responses/SeatsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`SeatsResponse`, () => {
  it(`should return SeatsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0056010200020001020002010102000202010200020301020002040003000200010300020101030002020103000203010300020400a20008120a1d0b010a0078'
      )
    );

    expect(response.parse()).toBeInstanceOf(SeatsResponse);
    expect(response.parse()).toEqual({
      personsDetected: [
        {
          seatPosition: 'front_left',
          personDetected: 'detected',
        },
        {
          seatPosition: 'front_right',
          personDetected: 'detected',
        },
        {
          seatPosition: 'rear_right',
          personDetected: 'detected',
        },
        {
          seatPosition: 'rear_left',
          personDetected: 'detected',
        },
        {
          seatPosition: 'rear_center',
          personDetected: 'not_detected',
        },
      ],
      seatbeltsFastened: [
        {
          seatPosition: 'front_left',
          seatbeltFastened: 'fastened',
        },
        {
          seatPosition: 'front_right',
          seatbeltFastened: 'fastened',
        },
        {
          seatPosition: 'rear_right',
          seatbeltFastened: 'fastened',
        },
        {
          seatPosition: 'rear_left',
          seatbeltFastened: 'fastened',
        },
        {
          seatPosition: 'rear_center',
          seatbeltFastened: 'not_fastened',
        },
      ],
    });
  });
});
