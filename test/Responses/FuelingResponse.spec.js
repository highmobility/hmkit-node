import Response from '../../src/Responses/Response';
import FuelingResponse from '../../src/Responses/FuelingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`EngineResponse`, () => {
  it(`should return EngineResponse`, () => {
    const response = new Response(
      hexToUint8Array('0040010200010103000101a20008120c150f02110078')
    );

    expect(response.parse()).toBeInstanceOf(FuelingResponse);
    expect(response.parse()).toEqual({
      gasFlapLock: 'locked',
      gasFlapPosition: 'opened',
    });
  });
});
