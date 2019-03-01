import Response from '../../src/Responses/Response';
import ClimateResponse from '../../src/Responses/ClimateResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ClimateResponse`, () => {
  it(`should return ClimateResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00240101000701000441b800000200070100044190000003000701000441b8000004000701000441b0000006000401000100070004010001000800040100010009000701000441b80000050004010001000b00060100030508000b00060100030608000c000701000441b00000a2000b01000800000168e6fd953d'
      )
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual({
      insideTemperature: { data: 23 },
      outsideTemperature: { data: 18 },
      driverTemperatureSetting: { data: 23 },
      passengerTemperatureSetting: { data: 22 },
      hvacState: { data: 'inactive' },
      defoggingState: { data: 'inactive' },
      defrostingState: { data: 'inactive' },
      ionisingState: { data: 'inactive' },
      defrostingTemperature: { data: 23 },
      hvacWeekdayStartingTimes: [
        { data: { weekday: 'saturday', hour: 8, minute: 0 } },
        { data: { weekday: 'sunday', hour: 8, minute: 0 } },
      ],
      rearTemperatureSetting: { data: 22 },
    });
  });
});
