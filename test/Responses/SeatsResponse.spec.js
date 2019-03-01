import Response from '../../src/Responses/Response';
import SeatsResponse from '../../src/Responses/SeatsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`SeatsResponse`, () => {
  it(`should return SeatsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00560102000501000200000200050100020100020005010002020002000501000203000300050100020000030005010002010003000501000202000300050100020300a2000b01000800000168e7337e30'
      )
    );

    expect(response.parse()).toBeInstanceOf(SeatsResponse);
    expect(response.parse()).toEqual({
      personsDetected: [
        {
          data: { seatPosition: 'front_left', personDetected: 'not_detected' },
        },
        {
          data: { seatPosition: 'front_right', personDetected: 'not_detected' },
        },
        {
          data: { seatPosition: 'rear_right', personDetected: 'not_detected' },
        },
        { data: { seatPosition: 'rear_left', personDetected: 'not_detected' } },
      ],
      seatbeltsFastened: [
        {
          data: {
            seatPosition: 'front_left',
            seatbeltFastened: 'not_fastened',
          },
        },
        {
          data: {
            seatPosition: 'front_right',
            seatbeltFastened: 'not_fastened',
          },
        },
        {
          data: {
            seatPosition: 'rear_right',
            seatbeltFastened: 'not_fastened',
          },
        },
        {
          data: { seatPosition: 'rear_left', seatbeltFastened: 'not_fastened' },
        },
      ],
    });
  });
});
