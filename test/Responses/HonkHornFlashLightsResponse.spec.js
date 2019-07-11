import Response from '../../src/Responses/Response';
import HonkHornFlashLightsResponse from '../../src/Responses/HonkHornFlashLightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HonkHornFlashLightsResponse`, () => {
  it(`should return HonkHornFlashLightsResponse`, () => {
    const response = new Response(
      hexToUint8Array('00260101000d0100010002000601699ab1f8b0')
    );

    expect(response.parse()).toBeInstanceOf(HonkHornFlashLightsResponse);
    expect(response.parse()).toEqual({
      flashers: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.656Z'),
      },
    });
  });
});
