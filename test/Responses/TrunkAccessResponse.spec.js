import Response from '../../src/Responses/Response';
import TrunkAccessResponse from '../../src/Responses/TrunkAccessResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TrunkAccessResponse`, () => {
  it(`should return TrunkAccessResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00210101000d0100010102000601699ab1f8ad02000d0100010002000601699ab1f8ad'
      )
    );

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);

    expect(response.parse()).toEqual({
      trunkLock: {
        value: 'locked',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      trunkPosition: {
        value: 'closed',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
