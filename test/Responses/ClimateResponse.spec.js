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
          hours: 0,
          minutes: 0,
          active: false,
        },
        tuesdays: {
          hours: 0,
          minutes: 0,
          active: false,
        },
        wednesdays: {
          hours: 0,
          minutes: 0,
          active: false,
        },
        thursdays: {
          hours: 0,
          minutes: 0,
          active: false,
        },
        fridays: {
          hours: 0,
          minutes: 0,
          active: false,
        },
        saturdays: {
          hours: 7,
          minutes: 30,
          active: true,
        },
        sundays: {
          hours: 7,
          minutes: 30,
          active: true,
        },
      },
    });
  });
});
