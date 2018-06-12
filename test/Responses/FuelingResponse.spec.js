import Response from '../../src/Responses/Response';
import FuelingResponse from '../../src/Responses/FuelingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`EngineResponse`, () => {
  it(`should return EngineResponse`, () => {
    const response = new Response(hexToUint8Array('00400101000101'));

    expect(response.parse()).toBeInstanceOf(FuelingResponse);
    expect(response.parse()).toEqual({
      gasFlap: 'open',
    });
  });
});
