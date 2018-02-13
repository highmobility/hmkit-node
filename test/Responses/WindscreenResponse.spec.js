import Response from '../../src/Responses/Response';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindscreenResponse`, () => {
  it(`should return WindscreenResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0042010100010202000103030001020400014305000112060001020700015F08000811010A1020050078'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: 'automatic',
      wipersIntensity: 'level_3',
      windscreenDamage: 'damage_smaller_than_1_inch',
      windscreenZoneMatrix: {
        rows: 4,
        columns: 3,
      },
      windscreenDamageZone: {
        rows: 1,
        columns: 2,
      },
      windscreenNeedsReplacement: 'replacement_needed',
      windscreenDamageConfidence: 95,
      windscreenDamageDetectionTime: new Date('2017-01-10T14:32:05Z'),
    });
  });
});
