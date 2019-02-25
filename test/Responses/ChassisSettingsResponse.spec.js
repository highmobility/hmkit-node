import Response from '../../src/Responses/Response';
import ChassisSettingsResponse from '../../src/Responses/ChassisSettingsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChassisSettingsResponse`, () => {
  it(`should return ChassisSettingsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005301010004010001010200040100010005000501000200150500050100020115060005010002002506000501000201250700050100020011070005010002011108000401000119090004010001370a0004010001e4a2000b01000800000168e6fcbfd9'
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
