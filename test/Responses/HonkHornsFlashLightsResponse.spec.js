import Response from '../../src/Responses/Response';
import HonkHornsFlashLightsResponse from '../../src/Responses/HonkHornsFlashLightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HonkHornsFlashLightsResponse`, () => {
  it(`should return HonkHornsFlashLightsResponse`, () => {
    const response = new Response(hexToUint8Array('00260101000102'));

    expect(response.parse()).toBeInstanceOf(HonkHornsFlashLightsResponse);
    expect(response.parse()).toEqual({ flashersState: 'left_flasher_active' });
  });
});
