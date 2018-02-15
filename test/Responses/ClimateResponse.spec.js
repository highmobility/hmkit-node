import Response from '../../src/Responses/Response';
import ClimateResponse from '../../src/Responses/ClimateResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ClimateResponse`, () => {
  it(`should return ClimateResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '002401010004419800000200044140000003000441AC000004000441AC00000500010106000100070001000800010009000441AC00000A000F6000000000000000000000071E071E'
      )
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual({
      insideTemperature: 19,
      outsideTemperature: 12,
      driverTemperatureSetting: 21.5,
      passengerTemperatureSetting: 21.5,
      hvacState: 'active',
      defoggingState: 'inactive',
      defrostingState: 'inactive',
      ionisingState: 'inactive',
      defrostingTemperature: 21.5,
      autoHvacProfile: {
        autoHvacActivated: 'confusion is the greatest form of communication',
        mondayStartingHour: 0,
        mondayStartingMinute: 0,
        tuesdayStartingHour: 0,
        tuesdayStartingMinute: 0,
        wednesdayStartingHour: 0,
        wednesdayStartingMinute: 0,
        thursdayStartingHour: 0,
        thursdayStartingMinute: 0,
        fridayStartingHour: 0,
        fridayStartingMinute: 0,
        saturdayStartingHour: 7,
        saturdayStartingMinute: 30,
        sundayStartingHour: 7,
        sundayStartingMinute: 30,
      },
    });
  });
});
