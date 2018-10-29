import Response from '../../src/Responses/Response';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindscreenResponse`, () => {
  it(`should return WindscreenResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '004201010001000200010003000100040001320500012206000100070001000800080001010200000078a20008120a1d122a1b0078'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: 'inactive',
      wipersIntensity: 'level_0',
      windscreenDamage: 'no_impact_detected',
      windscreenZoneMatrix: { rows: 3, columns: 2 },
      windscreenDamageZone: { rows: 2, columns: 2 },
      windscreenNeedsReplacement: 'unknown',
      windscreenDamageConfidence: 0,
      windscreenDamageDetectionTime: new Date('2000-01-01T00:00:00.000Z'),
    });
  });
});
