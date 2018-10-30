import Response from '../../src/Responses/Response';
import ClimateResponse from '../../src/Responses/ClimateResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ClimateResponse`, () => {
  it(`should return ClimateResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00240101000441b800000200044190000003000441b8000004000441b0000006000100070001000800010009000441b80000050001000b00030008000b00030108000b00030208000b00030308000b00030408000b00030508000b00030608000c000441b00000a20008120a1e0b312a0078'
      )
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual({
      insideTemperature: 23,
      outsideTemperature: 18,
      driverTemperatureSetting: 23,
      passengerTemperatureSetting: 22,
      hvacState: 'inactive',
      defoggingState: 'inactive',
      defrostingState: 'inactive',
      ionisingState: 'inactive',
      defrostingTemperature: 23,
      hvacWeekdayStartingTimes: [
        { weekday: 'monday', hour: 8, minute: 0 },
        { weekday: 'tuesday', hour: 8, minute: 0 },
        { weekday: 'wednesday', hour: 8, minute: 0 },
        { weekday: 'thursday', hour: 8, minute: 0 },
        { weekday: 'friday', hour: 8, minute: 0 },
        { weekday: 'saturday', hour: 8, minute: 0 },
        { weekday: 'sunday', hour: 8, minute: 0 },
      ],
      rearTemperatureSetting: 22,
    });
  });
});
