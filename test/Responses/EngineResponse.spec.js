import Response from '../../src/Responses/Response';
import EngineResponse from '../../src/Responses/EngineResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`EngineResponse`, () => {
  it(`should return EngineResponse`, () => {
    const response = new Response(hexToUint8Array('0035010100010002000100'));

    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual({
      ignition: 'engine_off',
      accessoriesIgnition: 'powered_off',
    });
  });
});
