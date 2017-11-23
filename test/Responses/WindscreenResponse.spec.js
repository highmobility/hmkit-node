import Response from '../../src/Responses/Response';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindscreemResponse`, () => {
  it(`should return WindscreenResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0042010024010001000200010003000101040001320500012206000101070001000800050001010200'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: {
        state: 'inactive',
        intensityLevel: 0
      },
      windscreen: {
        damage: 'no_damage',
        zoneMatrix: {
          horisontal: 3,
          vertical: 2
        },
        damageZone: {
          horisontal: 2,
          vertical: 2
        },
        needsReplacement: 'no',
        damageConfidence: 0,
        damageDetectionDate: {
          year: 2000,
          month: 1,
          day: 1,
          hour: 2,
          minute: 0
        }
      }
    });
  });
});
