import Response from '../../src/Responses/Response';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindscreemResponse`, () => {
  it(`should return WindscreemResponse`, () => {
    const response = new Response(
      hexToUint8Array('0042010203024312025f11010a102005')
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        wipers: {
          state: 'automatic',
          intensityLevel: 3,
        },
        windscreen: {
          damage: 'damage_smaller_than_1_inch',
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
            seconds: 5,
          },
        },
      })
    );

    const response2 = new Response(
      hexToUint8Array('0042010101034322014f11010a102005')
    );

    expect(response2.parse()).toBeInstanceOf(WindscreenResponse);

    const response3 = new Response(
      hexToUint8Array('0042010000010000003f11010a102005')
    );

    expect(response3.parse()).toBeInstanceOf(WindscreenResponse);
  });
});
