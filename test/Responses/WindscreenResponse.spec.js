import Response from '../../src/Responses/Response';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindscreenResponse`, () => {
  it(`should return WindscreenResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00420101000101020001030300010204000132050001230600010207000800000000000000000800080000010946873700a2000800000168e22fd169'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: 'active',
      wipersIntensity: 'level_3',
      windscreenDamage: 'damage_smaller_than_1_inch',
      windscreenZoneMatrix: { rows: 3, columns: 2 },
      windscreenDamageZone: { rows: 2, columns: 3 },
      windscreenNeedsReplacement: 'replacement_needed',
      windscreenDamageConfidence: 0,
      windscreenDamageDetectionTime: new Date('2006-02-07T22:00:00.000Z'),
    });
  });
});
