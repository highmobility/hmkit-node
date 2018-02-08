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
      hvacState: 'activated',
      defoggingState: 'deactivated',
      defrostingState: 'deactivated',
      ionisingState: 'deactivated',
      defrostingTemperature: 21.5,
      autoHvacActivatedOn: {
        mondays: false,
        tuesdays: false,
        wednesdays: false,
        thursdays: false,
        fridays: false,
         saturdays: {
             hours: 7,
             minutes: 30
         },
         sundays: {
             hours: 7,
             minutes: 30
         },
        constant: false
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
