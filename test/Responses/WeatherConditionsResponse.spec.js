import Response from '../../src/Responses/Response';
import WeatherConditionsResponse from '../../src/Responses/WeatherConditionsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WeatherConditionsResponse`, () => {
  it(`should return WeatherConditionsResponse`, () => {
    const response = new Response(
      hexToUint8Array('00550101000164')
    );

    expect(response.parse()).toBeInstanceOf(WeatherConditionsResponse);
    expect(response.parse()).toEqual({
      rainIntensity: 100
    });
  });
});
