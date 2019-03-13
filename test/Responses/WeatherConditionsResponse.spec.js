import Response from '../../src/Responses/Response';
import WeatherConditionsResponse from '../../src/Responses/WeatherConditionsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WeatherConditionsResponse`, () => {
  it(`should return WeatherConditionsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00550101000b0100083fe0000000000000a2000b01000800000168e740a9b3'
      )
    );

    expect(response.parse()).toBeInstanceOf(WeatherConditionsResponse);
    expect(response.parse()).toEqual({ rainIntensity: { value: 0.5 } });
  });
});
