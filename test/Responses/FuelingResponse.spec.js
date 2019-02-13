import Response from '../../src/Responses/Response';
import FuelingResponse from '../../src/Responses/FuelingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`EngineResponse`, () => {
  it(`should return EngineResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0040010200040100010003000401000100a2000b01000800000168e70df116'
      )
    );

    expect(response.parse()).toBeInstanceOf(FuelingResponse);
    expect(response.parse()).toEqual({
      gasFlapLock: 'unlocked',
      gasFlapPosition: 'closed',
    });
  });
});
