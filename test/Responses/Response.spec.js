import Response from '../../src/Responses/Response';
import EngineResponse from '../../src/Responses/EngineResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`Response`, () => {
  it(`should throw response length invalid exception`, async () => {
    expect(() => {
      new Response([0]); // eslint-disable-line no-new
    }).toThrow();

    expect(() => {
      new Response([0, 0]); // eslint-disable-line no-new
    }).not.toThrow();
  });

  it(`should return bytes`, () => {
    const response = new Response([0, 53, 1, 1]);
    expect(response.bytes()).toEqual([0, 53, 1, 1]);
  });

  it.only(`should return cached version if parse is called multiple times`, () => {
    const response = new Response(hexToUint8Array('00350101000100'));
    const parsed1 = response.parse();
    const parsed2 = response.parse();

    expect(parsed1).toBe(parsed2);
    expect(parsed2).toBeInstanceOf(EngineResponse);
    expect(parsed2).toEqual({
      ignition: 'engine_off',
    });
  });
});
