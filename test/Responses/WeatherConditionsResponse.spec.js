import Response from '../../src/Responses/Response';
import WeatherConditionsResponse from '../../src/Responses/WeatherConditionsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WeatherConditionsResponse`, () => {
  it(`should return WeatherConditionsResponse`, () => {
    const response = new Response(
      hexToUint8Array('0055010100083fe0000000000000a2000813020c0f372b0078')
    );

    expect(response.parse()).toBeInstanceOf(WeatherConditionsResponse);
    expect(response.parse()).toEqual({ rainIntensity: 0.5 });
  });
});
