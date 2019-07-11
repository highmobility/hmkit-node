import Response from '../../src/Responses/Response';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RooftopControlResponse`, () => {
  it(`should return RooftopControlResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `002501010014010008000000000000000002000601699ab1f8af020014010008000000000000000002000601699ab1f8af03000d0100010002000601699ab1f8af04000d0100010002000601699ab1f8af05000d0100010002000601699ab1f8af`
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);

    expect(response.parse()).toEqual({
      dimming: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      position: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      convertibleRoof: {
        value: 'closed',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      sunroofTilt: {
        value: 'closed',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      sunroofState: {
        value: 'closed',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
