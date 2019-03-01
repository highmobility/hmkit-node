import Response from '../../src/Responses/Response';
import HonkHornFlashLightsResponse from '../../src/Responses/HonkHornFlashLightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HonkHornFlashLightsResponse`, () => {
  it(`should return HonkHornFlashLightsResponse`, () => {
    const response = new Response(
      hexToUint8Array('00260101000401000100a2000b01000800000168e7150b9f')
    );

    expect(response.parse()).toBeInstanceOf(HonkHornFlashLightsResponse);
    expect(response.parse()).toEqual({ flashers: { data: 'inactive' } });
  });
});
