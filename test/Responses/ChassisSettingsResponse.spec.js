import Response from '../../src/Responses/Response';
import ChassisSettingsResponse from '../../src/Responses/ChassisSettingsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChassisSettingsResponse`, () => {
  it(`should return ChassisSettingsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005301010001010200010005000200150500020115060002002506000201250700020011070002011108000119090001370a0001e4a20008120a170a360000b4'
      )
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual({
      drivingMode: 'eco',
      sportChrono: 'inactive',
      currentSpringRates: [
        {
          axle: 'front_axle',
          springRate: 21,
        },
        {
          axle: 'rear_axle',
          springRate: 21,
        },
      ],
      maximumSpringRates: [
        {
          axle: 'front_axle',
          springRate: 37,
        },
        {
          axle: 'rear_axle',
          springRate: 37,
        },
      ],
      minimumSpringRates: [
        {
          axle: 'front_axle',
          springRate: 17,
        },
        {
          axle: 'rear_axle',
          springRate: 17,
        },
      ],
      currentChassisPosition: 25,
      maximumChassisPosition: 55,
      minimumChassisPosition: -28,
    });
  });
});
