import Response from '../../src/Responses/Response';
import ClimateResponse from '../../src/Responses/ClimateResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ClimateResponse`, () => {
  it(`should return ClimateResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '002401419800004140000041AC000041AC000001000041AC00000600000000000000000000071E071E'
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
      defrostingTemperature: 21.5,
      autoHvacActivatedOn: {
        mondays: false,
        tuesdays: false,
        wednesdays: false,
        thursdays: false,
        fridays: false,
        saturdays: {
          hours: 7,
          minutes: 30,
        },
        sundays: {
          hours: 7,
          minutes: 30,
        },
        constant: false,
      },
    });
  });

  it(`should return vehicle state version of ClimateResponse`, () => {
    const response = new Response(
      hexToUint8Array('002410419800004140000001000041AC000006')
    ).vehicleState();
    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual({
      insideTemperature: 19,
      outsideTemperature: 12,
      hvacState: 'activated',
      defoggingState: 'deactivated',
      defrostingState: 'deactivated',
      defrostingTemperature: 21.5,
      autoHvacActivatedOn: {
        mondays: false,
        tuesdays: false,
        wednesdays: false,
        thursdays: false,
        fridays: false,
        saturdays: true,
        sundays: true,
        constant: false,
      },
    });
    expect(response.parse().driverTemperatureSetting).not.toBeDefined();
    expect(response.parse().passengerTemperatureSetting).not.toBeDefined();

    const response2 = new Response(
      hexToUint8Array('002411419800004140000001000041AC000006')
    ).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });

  it(`should handle other cases of ClimateResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '002401419800004140000041AC000041AC000000010141AC0000FF071E071E071E071E071E071E071E'
      )
    );
    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        hvacState: 'deactivated',
        defoggingState: 'activated',
        defrostingState: 'activated',
      })
    );

    const response2 = new Response(
      hexToUint8Array(
        '002401419800004140000041AC000041AC000000010141AC0000010000000000000000000000000000'
      )
    );
    expect(response2.parse()).toBeInstanceOf(ClimateResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        autoHvacActivatedOn: {
          mondays: false,
          tuesdays: false,
          wednesdays: false,
          thursdays: false,
          fridays: false,
          saturdays: false,
          sundays: false,
          constant: true,
        },
      })
    );
  });
});
