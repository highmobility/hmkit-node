import Response from '../../src/Responses/Response';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindscreenResponse`, () => {
  it(`should return WindscreenResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0042010100010202000103030001010400014305000112060001020700015F08000811010A1020050000'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: {
        state: 'automatic',
        intensityLevel: 3,
      },
      windscreen: {
        damage: 'no_damage',
        zoneMatrix: {
          horisontal: 4,
          vertical: 3,
        },
        damageZone: {
          horisontal: 1,
          vertical: 2,
        },
        needsReplacement: 'yes',
        damageConfidence: 0.95,
        damageDetectionDate: {
          year: 2017,
          month: 1,
          day: 10,
          hour: 16,
          minute: 32,
          second: 5,
          utcOffset: 0,
        },
      },
    });
  });
});
