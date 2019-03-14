import Response from '../../src/Responses/Response';
import TrunkAccessResponse from '../../src/Responses/TrunkAccessResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TrunkAccessResponse`, () => {
  it(`should return TrunkAccessResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0021010100040100010102000401000100a2000b01000800000168e73657c7'
      )
    );

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual({
      trunkLock: { value: 'locked' },
      trunkPosition: { value: 'closed' },
    });
  });
});
