import Response from '../../src/Responses/Response';
import ChassisSettingsResponse from '../../src/Responses/ChassisSettingsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChassisSettingsResponse`, () => {
  it(`should return ChassisSettingsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00530101000101020001010300040015251503000401171F110400031937E4'
      )
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual({
      chassisPosition: {
        maximumValue: 55,
        minimumValue: -28,
        chassisPosition: 25,
      },
      drivingMode: 'eco',
      sportChrono: 'active',
      springRates: [
        {
          axle: 'front_axle',
          springRate: 21,
          maximumValue: 37,
          minimumValue: 21,
        },
        {
          axle: 'rear_axle',
          springRate: 23,
          maximumValue: 31,
          minimumValue: 17,
        },
      ],
    });
  });
});
