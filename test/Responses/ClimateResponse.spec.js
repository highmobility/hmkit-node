import Response from '../../src/Responses/Response';
import ClimateResponse from '../../src/Responses/ClimateResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ClimateResponse`, () => {
  it(`should return ClimateResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '002401004501000441B800000200044190000003000441A4000004000441B4000006000100070001000800010009000441B80000050001000A000FC1020D033A00000000000000000000'
      )
    );
    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual({
      insideTemperature: 23,
      outsideTemperature: 18,
      driverTemperatureSetting: 20.5,
      passengerTemperatureSetting: 22.5,
      hvacState: 'inactivated',
      defoggingState: 'inactivated',
      defrostingState: 'inactivated',
      ionisingState: 'inactivated',
      defrostingTemperature: 23,
      autoHvacActivatedOn: {
        mondays: {
          hours: 2,
          minutes: 13
        },
        tuesdays: {
          hours: 3,
          minutes: 58
        },
        wednesdays: false,
        thursdays: false,
        fridays: false,
        saturdays: false,
        sundays: false,
        constant: true
      }
    });
  });

  // it(`should handle other cases of ClimateResponse`, () => {
  //   const response = new Response(
  //     hexToUint8Array(
  //       '002401419800004140000041AC000041AC000000010141AC0000FF071E071E071E071E071E071E071E'
  //     )
  //   );
  //   expect(response.parse()).toBeInstanceOf(ClimateResponse);
  //   expect(response.parse()).toEqual(
  //     expect.objectContaining({
  //       hvacState: 'deactivated',
  //       defoggingState: 'activated',
  //       defrostingState: 'activated'
  //     })
  //   );

  //   const response2 = new Response(
  //     hexToUint8Array(
  //       '002401419800004140000041AC000041AC000000010141AC0000010000000000000000000000000000'
  //     )
  //   );
  //   expect(response2.parse()).toBeInstanceOf(ClimateResponse);
  //   expect(response2.parse()).toEqual(
  //     expect.objectContaining({
  //       autoHvacActivatedOn: {
  //         mondays: false,
  //         tuesdays: false,
  //         wednesdays: false,
  //         thursdays: false,
  //         fridays: false,
  //         saturdays: false,
  //         sundays: false,
  //         constant: true
  //       }
  //     })
  //   );
  // });
});
