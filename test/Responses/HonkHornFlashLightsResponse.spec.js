import Response from '../../src/Responses/Response';
import HonkHornFlashLightsResponse from '../../src/Responses/HonkHornFlashLightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HonkHornFlashLightsResponse`, () => {
  it(`should return HonkHornFlashLightsResponse`, () => {
    const response = new Response(hexToUint8Array('00260101000102'));

    expect(response.parse()).toBeInstanceOf(HonkHornFlashLightsResponse);
    expect(response.parse()).toEqual({ flashers: 'left_flasher_active' });
  });
});
