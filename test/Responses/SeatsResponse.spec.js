import Response from '../../src/Responses/Response';
import SeatsResponse from '../../src/Responses/SeatsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`SeatsResponse`, () => {
  it(`should return SeatsResponse`, () => {
    const response = new Response(
      hexToUint8Array('005601010003000101010003010000')
    );

    expect(response.parse()).toBeInstanceOf(SeatsResponse);
    expect(response.parse()).toEqual({
      seats: expect.objectContaining({
        frontLeft: {
          person: 'detected',
          seatbelt: 'fastened',
        },
        frontRight: {
          person: 'not_detected',
          seatbelt: 'not_fastened',
        },
      }),
    });
  });
});
