import Response from '../../src/Responses/Response';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindscreenResponse`, () => {
  it(`should return WindscreenResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00420101000401000100020004010001000300040100010004000401000132050004010001220600040100010007000b010008000000000000000008000b010008000000dc6acfac00a2000b01000800000168e7435325'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: { value: 'inactive' },
      wipersIntensity: { value: 'level_0' },
      windscreenDamage: { value: 'no_impact_detected' },
      windscreenZoneMatrix: { value: { rows: 3, columns: 2 } },
      windscreenDamageZone: { value: { rows: 2, columns: 2 } },
      windscreenNeedsReplacement: { value: 'unknown' },
      windscreenDamageConfidence: { value: 0 },
      windscreenDamageDetectionTime: {
        value: new Date('2000-01-01T00:00:00.000Z'),
      },
    });
  });
});
