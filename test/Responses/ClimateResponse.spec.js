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
        mondays: {
          hour: 0,
          minute: 0,
          state: 'inactive',
        },
        tuesdays: {
          hour: 0,
          minute: 0,
          state: 'inactive',
        },
        wednesdays: {
          hour: 0,
          minute: 0,
          state: 'inactive',
        },
        thursdays: {
          hour: 0,
          minute: 0,
          state: 'inactive',
        },
        fridays: {
          hour: 0,
          minute: 0,
          state: 'inactive',
        },
        saturdays: {
          hour: 7,
          minute: 30,
          state: 'active',
        },
        sundays: {
          hour: 7,
          minute: 30,
          state: 'active',
        },
        constant: 'inactive',
      },
    });
  });
});
