import Response from '../../src/Responses/Response';
import EngineResponse from '../../src/Responses/EngineResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`EngineResponse`, () => {
  it(`should return EngineResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0035010100040100010002000401000100a2000b01000800000168e703ff30'
      )
    );

    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual({
      ignition: { data: 'off' },
      accessoriesIgnition: { data: 'off' },
    });
  });
});
