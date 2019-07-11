import Response from '../../src/Responses/Response';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WindscreenResponse`, () => {
  it(`should return WindscreenResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00420101000d0100010002000601699ab1f8ad02000d0100010002000601699ab1f8ad03000d0100010002000601699ab1f8ad04000d0100013202000601699ab1f8ad05000d0100012202000601699ab1f8ad06000d0100010002000601699ab1f8ad070014010008000000000000000002000601699ab1f8ad080014010008000000dc6acfac0002000601699ab1f8ad'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      wipersIntensity: {
        value: 'level_0',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      windscreenDamage: {
        value: 'no_impact_detected',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      windscreenZoneMatrix: {
        value: { rows: 3, columns: 2 },
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      windscreenDamageZone: {
        value: { rows: 2, columns: 2 },
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      windscreenNeedsReplacement: {
        value: 'unknown',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      windscreenDamageConfidence: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      windscreenDamageDetectionTime: {
        value: new Date('2000-01-01T00:00:00.000Z'),
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
