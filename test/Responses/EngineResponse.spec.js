import Response from '../../src/Responses/Response';
import EngineResponse from '../../src/Responses/EngineResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`EngineResponse`, () => {
  it(`should return EngineResponse`, () => {
    const response = new Response(hexToUint8Array('00350101'));
    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual({
      engine: 'on',
    });
  });
});