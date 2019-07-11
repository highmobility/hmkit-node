import Response from '../../src/Responses/Response';
import EngineResponse from '../../src/Responses/EngineResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`EngineResponse`, () => {
  it(`should return EngineResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00350101000d0100010002000601699ab1f8ae02000d0100010002000601699ab1f8ae'
      )
    );

    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual({
      ignition: {
        value: 'off',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      accessoriesIgnition: {
        value: 'off',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
    });
  });
});
