import Response from '../../src/Responses/Response';
import SeatsResponse from '../../src/Responses/SeatsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`SeatsResponse`, () => {
  it(`should return SeatsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00560102000e010002000002000601699ab1f8ab02000e010002010002000601699ab1f8ac02000e010002020002000601699ab1f8ac02000e010002030002000601699ab1f8ac03000e010002000002000601699ab1f8ac03000e010002010002000601699ab1f8ac03000e010002020002000601699ab1f8ac03000e010002030002000601699ab1f8ac'
      )
    );

    expect(response.parse()).toBeInstanceOf(SeatsResponse);

    expect(response.parse()).toEqual({
      personsDetected: [
        {
          value: {
            seatPosition: 'front_left',
            personDetected: 'not_detected',
          },
          timestamp: new Date('2019-03-20T10:42:28.651Z'),
        },
        {
          value: {
            seatPosition: 'front_right',
            personDetected: 'not_detected',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            seatPosition: 'rear_right',
            personDetected: 'not_detected',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            seatPosition: 'rear_left',
            personDetected: 'not_detected',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
      ],
      seatbeltsFastened: [
        {
          value: {
            seatPosition: 'front_left',
            seatbeltFastened: 'not_fastened',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            seatPosition: 'front_right',
            seatbeltFastened: 'not_fastened',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            seatPosition: 'rear_right',
            seatbeltFastened: 'not_fastened',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            seatPosition: 'rear_left',
            seatbeltFastened: 'not_fastened',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
      ],
    });
  });
});
